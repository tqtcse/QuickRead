import React, { useState } from 'react';
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
import { login } from '@/src/store/userActions';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        const email = 'test@gmail.com';
        const password = '1234567890';

        dispatch(login(email, password));

        router.push('/(tabs)/home/home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello There !!</Text>
            <Text style={styles.subtitle}>Please enter your username/email and password to sign in.</Text>



            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
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



            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingHorizontal: 24,
        // alignItems: 'center', // Bỏ dòng này nếu không muốn căn giữa toàn bộ
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginBottom: 8,
    },
    subtitle: {
        color: '#000',
        textAlign: 'left',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
        fontSize: 14,
        marginBottom: 12,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
        marginBottom: 12,
    },
    passwordInput: {
        flex: 1,
        fontSize: 14,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 100,
        width: '90%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});