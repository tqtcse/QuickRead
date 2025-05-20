import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setRegisterData } from '@/src/store/userSlice';

const { height } = Dimensions.get('window');

const CompletedProfile = () => {
    const dispatch = useDispatch();
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    // Hàm định dạng ngày sinh
    const formatDateOfBirth = (text: string) => {
        // Loại bỏ các ký tự không phải số
        const cleaned = text.replace(/[^0-9]/g, '');

        // Kiểm tra độ dài chuỗi
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

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setAvatarUri(pickerResult.assets[0].uri);
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

            <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarPlaceholderText}>Tap to select</Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (DD/MM/YYYY)"
                    value={dateOfBirth}
                    onChangeText={formatDateOfBirth}
                    keyboardType="numeric"
                    maxLength={10} // Giới hạn độ dài: DD/MM/YYYY
                />
                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    value={country}
                    onChangeText={setCountry}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
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
        color: '#007AFF',
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
});