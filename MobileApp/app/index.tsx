import { useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '@/src/store/auth/authSlice';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function IndexPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const initApp = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                dispatch(setToken(token));
                router.replace('/(tabs)/home/home');
            } else {
                router.replace('/(onboarding)/onboarding1');
            }
        } catch (error) {
            console.error('Error during splash logic', error);
        } finally {

            await SplashScreen.hideAsync();
        }
    }, []);

    useEffect(() => {
        initApp();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
            <Toast />
        </View>
    );
}
