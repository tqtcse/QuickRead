import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Giả lập check token (thường bạn sẽ kiểm tra AsyncStorage)
    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
            // router.replace('/(tabs)/home/home');
        };
        checkLogin();
    }, []);

    const login = async () => {
        console.log("login")
        await AsyncStorage.setItem('token', 'your_token_here');
        setIsLoggedIn(true);
        router.replace('/(tabs)/home/home');
    };
    const logout = async () => {
        console.log("logout")
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('token');
        router.replace('/(auth)/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};