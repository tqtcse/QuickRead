// app/_layout.tsx
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/src/store';

// useEffect(() => {
//     console.log("as")
// }, [isLoggedIn]);

export default function Layout() {
    return (
        <Provider store={store}>

            <Slot />

        </Provider>

    );
}