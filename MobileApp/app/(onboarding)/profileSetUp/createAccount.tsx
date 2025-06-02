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
import { useDispatch } from 'react-redux';
import { setRegisterData } from '@/src/store/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { register } from '@/src/services/authApi';
import Toast from 'react-native-toast-message';

const CreateAccount = () => {
    const dispatch = useDispatch();
    const registerData = useSelector((state: RootState) => state.user.registerData);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleCreateAccount = async () => {
        const newErrors = {
            username: username.trim() ? '' : 'Username is required',
            email: email.trim() ? '' : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email format' : ''),
            password: password.length < 6 ? 'Password must be at least 6 characters' : '',
            confirmPassword: confirmPassword !== password ? 'Passwords do not match' : '',
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some(error => error);
        if (hasError) return;

        dispatch(setRegisterData({ username, email, password, confirmPassword }));

        const response = await register(
            username, email, password, confirmPassword,
            registerData.country, registerData.date_of_birth, registerData.fullname,
            registerData.phone_number, registerData.avatar,
            registerData.gender, registerData.genres
        );

        if (response) {
            Toast.show({
                text1: 'Create account successfully',
                type: 'success',
                visibilityTime: 2000,
            });
            setTimeout(() => {
                router.push('/(auth)/login');
            }, 2000);
        }
        else {
            Toast.show({
                text1: 'User or email already exists',
                type: 'error',
                visibilityTime: 2000,
            });
        }
    };
    const handleUsernameChange = (text: string) => {
        setUsername(text);
        setErrors(prev => ({ ...prev, username: text.trim() ? '' : 'Username is required' }));
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let error = '';
        if (!text.trim()) error = 'Email is required';
        else if (!emailRegex.test(text)) error = 'Invalid email format';
        setErrors(prev => ({ ...prev, email: error }));
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setErrors(prev => ({ ...prev, password: text.length < 6 ? 'Password must be at least 6 characters' : '' }));
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        setErrors(prev => ({
            ...prev,
            confirmPassword: text !== password ? 'Passwords do not match' : '',
        }));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account !!</Text>
            <Text style={styles.subtitle}>Enter your username, email & password.</Text>

            <TextInput
                style={[styles.input, errors.username ? styles.inputError : null]}
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

            <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}


            <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
                </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <View style={[styles.passwordContainer, errors.confirmPassword ? styles.inputError : null]}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirm}
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                    <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={20} color="#888" />
                </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
        alignSelf: 'flex-start',
        marginLeft: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',

        color: '#000',
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
        color: 'rgb(107, 114, 128)',
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
        color: 'rgb(107, 114, 128)',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 100,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    subtitle: {

        color: '#000',
        textAlign: 'center',
        marginBottom: 24,

    },
});
