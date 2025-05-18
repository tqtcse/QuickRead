// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './context/auth-context';
import { AuthProvider } from './context/auth-context';

export default function IndexPage() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                router.replace('/(tabs)/home/home'); // ✅ Trang home có tab layout
            } else {
                router.replace('/(onboarding)/onboarding1'); // ✅ Trang login không có tab layout
            }
        };

        checkLogin();
    }, [isLoggedIn]);

    return (
        <AuthProvider>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        </AuthProvider>
    );
}
