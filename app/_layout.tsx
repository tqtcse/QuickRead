// app/_layout.tsx
import { Slot } from 'expo-router';
import { AuthProvider } from './context/auth-context';
import { useEffect } from 'react';



// useEffect(() => {
//     console.log("as")
// }, [isLoggedIn]);

export default function Layout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}