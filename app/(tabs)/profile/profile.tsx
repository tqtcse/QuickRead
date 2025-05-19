import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';
import { getUserInformation } from '@/src/store/userActions';
import { useSelector } from 'react-redux';

import { useAuth } from '@/app/context/auth-context';

const Profile: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { userInformation } = useSelector((state: RootState) => state.user);

    const { logout } = useAuth();

    useEffect(() => {
        dispatch(getUserInformation());
    }, []);

    const handlePersonalInfo = () => {
        router.push('/(tabs)/profile/personalInfo');
    };

    const handleLogout = () => {
        logout();

    };

    console.log('userInformation:', userInformation);

    return (
        <View style={styles.container}>
            {/* Container 1: Avatar + Name + Email + Edit icon */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg' }}
                    style={styles.avatar}
                />
                <View style={styles.profileTextContainer}>
                    <View style={styles.profileText}>
                        <Text style={styles.name}>{userInformation.name}</Text>
                        <Text style={styles.email}>{userInformation.email}</Text>
                    </View>

                </View>
            </View>

            {/* Container 2: Personal Info */}
            <TouchableOpacity style={styles.optionContainer} onPress={handlePersonalInfo}>
                <View style={styles.optionLeft}>
                    <Ionicons name="person-outline" size={24} color="#333" />
                    <Text style={styles.optionText}>Personal Info</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#aaa" />
            </TouchableOpacity>

            {/* Container 3: Logout */}
            <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
                <View style={styles.optionLeft}>
                    <Ionicons name="log-out-outline" size={24} color="#d11a2a" />
                    <Text style={[styles.optionText, { color: '#d11a2a' }]}>Logout</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#aaa" />
            </TouchableOpacity>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginRight: 16,
    },
    profileTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileText: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    email: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    editIcon: {
        padding: 6,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        marginLeft: 14,
        fontSize: 16,
        color: '#333',
    },
});
