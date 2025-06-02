import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';
import { updateInformation as updateInformationAction } from '@/src/store/user/userActions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { uploadAvatar } from '@/src/services/userApi';
import { API_URL } from '@/src/config/env';
import { KeyboardAvoidingView } from 'react-native';

dayjs.extend(customParseFormat);

const PersonalInfo = () => {



    const [avatar, setAvatar] = useState('')
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.user.token);
    const user = useSelector((state: RootState) => state.user.user);



    useEffect(() => {
        setFullName(user.fullname);
        setUsername(user.username);
        setEmail(user.email);
        setPhoneNumber(user.phone_number);
        setAddress(user.address);
        setAvatar(`${user.avatar_url}?t=${Date.now()}`);
        setDateOfBirth(dayjs(user.date_of_birth).format('MM/DD/YYYY'));
    }, [user]);

    const updateInformation = () => {

        if (token) {
            let isoDate = '';
            if (dateOfBirth) {
                console.log('dateOfBirth', dateOfBirth);
                const parsedDate = dayjs(dateOfBirth, 'MM/DD/YYYY');
                console.log('parsedDate', parsedDate);
                if (parsedDate.isValid()) {
                    isoDate = parsedDate.toISOString();
                } else {
                    console.error('Ngày sinh không hợp lệ:', dateOfBirth);
                    return;
                }
            }
            dispatch(updateInformationAction(token, fullName, username, email, phoneNumber, address, avatar, country, isoDate));
        }
    }

    const pickImage = async () => {
        if (!token) return;

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: Platform.OS === 'web', // chỉ lấy base64 trên web để tạo Blob
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        let formData = new FormData();
        let filename = asset.fileName || `avatar_${Date.now()}.jpg`;
        let mimeType = asset.mimeType || 'image/jpeg';

        if (Platform.OS === 'web') {
            // Convert base64 data URI to Blob
            const dataUri = asset.uri; // data:image/jpeg;base64,...
            const blob = dataURItoBlob(dataUri);

            formData.append('avatar', blob, filename);
        } else {
            // Android/iOS: gửi file từ uri bình thường
            formData.append('avatar', {
                uri: asset.uri,
                name: filename,
                type: mimeType,
            } as any);
        }

        try {
            const response = await uploadAvatar(token, formData);
            console.log('Upload success:', response);
            setAvatar(`${response.user.avatar_url}?t=${Date.now()}`);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    // Hàm helper convert data URI (base64) sang Blob cho web
    function dataURItoBlob(dataURI: string) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={80}>
            <ScrollView
                keyboardShouldPersistTaps="handled"

            >

                <View style={styles.container}>

                    <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
                        {avatar ? (
                            <Image key={avatar} source={{ uri: `${API_URL}${avatar}` }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}></Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Input Fields */}
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                value={fullName}
                                onChangeText={setFullName}
                                onBlur={updateInformation}
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={setUsername}
                                onBlur={updateInformation}
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* <View style={styles.formGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                editable={false}
                                style={styles.input}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                onBlur={updateInformation}
                                placeholderTextColor="#999"
                            />
                        </View> */}

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                onBlur={updateInformation}
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Date of Birth</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                                onBlur={updateInformation}
                                placeholderTextColor="#999"
                            />
                        </View>

                    </View>

                    {/* Avatar */}

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

export default PersonalInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
        alignItems: 'center',
    },
    avatarWrapper: {
        marginBottom: 30,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#007AFF',
        fontSize: 14,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    // input: {
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 10,
    //     paddingHorizontal: 15,
    //     paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    //     fontSize: 16,
    //     marginBottom: 14,

    // },
    formGroup: {
        marginBottom: 18,
    },

    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
        fontWeight: '600',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});
