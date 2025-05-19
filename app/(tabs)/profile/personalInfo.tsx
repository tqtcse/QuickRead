import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';


const PersonalInfo = () => {

    const { userInformation } = useSelector((state: RootState) => state.user);

    const [avatar, setAvatar] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setFullName(userInformation.name);
        setUsername(userInformation.username);
        setEmail(userInformation.email);
        setPhoneNumber(userInformation.phone);
        setAddress(userInformation.address);
    }, [userInformation]);

    const updateInformation = () => {
        console.log('updateInformation');
        // dispatch(updateInformation(fullName, username, email, phoneNumber, address, avatar));
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setAvatar(pickerResult.assets[0].uri);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>Tap to select avatar</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Input Fields */}
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        onBlur={updateInformation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        onBlur={updateInformation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={updateInformation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        onBlur={updateInformation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Date of Birth (YYYY-MM-DD)"
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        onBlur={updateInformation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        onBlur={updateInformation}
                    />
                </View>

                {/* Avatar */}

            </View>
        </ScrollView>
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
        fontSize: 16,
        marginBottom: 14,
    },
});
