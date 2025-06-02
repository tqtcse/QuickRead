import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setRegisterData } from '@/src/store/user/userSlice';
import { uploadAvatar } from '@/src/services/userApi';
const { height } = Dimensions.get('window');
import Toast from 'react-native-toast-message';


const CompletedProfile = () => {
    const dispatch = useDispatch();
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [focusedInput, setFocusedInput] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const isPhoneNumberValid = (phone: string) => {
        const phoneRegex = /^\d{9,11}$/;
        return phoneRegex.test(phone);
    };

    const handlePhoneChange = (text: string) => {
        setPhoneNumber(text);

        const phoneRegex = /^\d{9,11}$/;
        if (text.trim() === '') {
            setPhoneError('Phone number is required');
        } else if (!phoneRegex.test(text)) {
            setPhoneError('Invalid phone number');
        } else {
            setPhoneError('');
        }
    };

    const isFormValid = fullName.trim() !== ''
        && phoneNumber.trim() !== ''
        && isPhoneNumberValid(phoneNumber)
        && dateOfBirth.trim() !== ''
        && /^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)


    const formatDateOfBirth = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '');

        if (cleaned.length <= 8) {
            let formatted = cleaned;
            if (cleaned.length > 2) {
                formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
            }
            if (cleaned.length > 4) {
                formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
            }
            setDateOfBirth(formatted);
        }
    };

    const handleUpdate = () => {
        // Kiểm tra định dạng ngày sinh trước khi dispatch
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(dateOfBirth)) {
            alert('Please enter a valid date of birth (DD/MM/YYYY)');
            return;
        }
        dispatch(setRegisterData({ avatar: avatarUri, phone_number: phoneNumber, address: country, fullname: fullName, date_of_birth: dateOfBirth }));
        router.push('/(onboarding)/profileSetUp/createAccount');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete your profile</Text>
            <Text style={styles.subtitle}>Only you can see your personal data.</Text>

            <View style={styles.avatarWrapper} >

                <Image source={require('../../../assets/images/logo.png')} style={styles.avatar} />

            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}

                />
                <TextInput
                    style={[styles.input, phoneError ? styles.inputError : null]}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                />
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (DD/MM/YYYY)"
                    value={dateOfBirth}
                    onChangeText={formatDateOfBirth}
                    keyboardType="numeric"
                    maxLength={10}
                />

            </View>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: isFormValid ? '#007AFF' : '#ccc' }]}
                onPress={handleUpdate}
                disabled={!isFormValid}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CompletedProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: height * 0.07,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    avatarWrapper: {
        marginVertical: 10,
        borderRadius: 50,
        width: 100,
        height: 100,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholderText: {
        color: 'rgb(107, 114, 128)',
        textAlign: 'center',
        fontSize: 12,
    },
    form: {
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        fontSize: 14,
        marginBottom: 10,
        color: 'rgb(107, 114, 128)',
    },
    button: {
        marginTop: 12,
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        borderRadius: 25,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 6,
        marginLeft: 4,
    },
    inputError: {
        borderColor: 'red',
    },
});