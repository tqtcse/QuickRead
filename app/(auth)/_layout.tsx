import { Slot } from 'expo-router';
import { AuthProvider } from '../context/auth-context';
export default function AuthLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}