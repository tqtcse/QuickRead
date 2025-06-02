import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';
import { login } from '@/src/store/user/userActions';
import Toast from 'react-native-toast-message';
const Login = () => {
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        console.log(token)
        if (token) {
            Toast.show({
                type: 'success',
                text1: 'Login successful',
                text2: 'Welcome back!',
                visibilityTime: 2000,
            });
            setTimeout(() => {
                router.push('/(tabs)/home/home')
            }, 2000);
        }

    }, [token]);


    const handleLogin = () => {

        dispatch(login(email, password));

    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Hello There !!</Text>
            <Text style={styles.subtitle}>Please enter your username/email and password to sign in.</Text>

            <TextInput
                style={styles.input}
                placeholder="Email or Username"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>

            {/* Dòng tạo tài khoản */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(onboarding)/onboarding3')}>
                    <Text style={styles.signupLink}>Create an account</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafc',
        paddingTop: 80,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 32,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 14 : 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 14 : 12,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#6b7280',
        fontSize: 14,
    },
    signupLink: {
        color: '#4f46e5',
        fontWeight: '600',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingVertical: 14,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 28,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});