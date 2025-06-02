import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';
import { getUser } from '@/src/store/user/userActions';
import { useSelector } from 'react-redux';
import { logout } from '@/src/store/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanUser } from '@/src/store/user/userSlice';
import { API_URL } from '@/src/config/env';

const Profile: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);
    const token = useSelector((state: RootState) => state.user.token);
    const hasFetchedUser = useSelector((state: RootState) => state.user.hasFetchedUser);


    useEffect(() => {
        console.log('hasFetchedUser', hasFetchedUser);
        if (token && !hasFetchedUser) {
            dispatch(getUser(token));

        }
    }, []);

    const handlePersonalInfo = () => {
        router.push('/(tabs)/profile/personalInfo');
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(cleanUser());
        AsyncStorage.removeItem('token');
        router.push('/(auth)/login');
    };



    return (
        <View style={styles.container}>
            {/* Container 1: Avatar + Name + Email + Edit icon */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: user.avatar_url ? `${API_URL}${user.avatar_url}?t=${Date.now()}` : require('@/assets/images/user.jpg') }}

                    style={styles.avatar}
                />
                <View style={styles.profileTextContainer}>
                    <View style={styles.profileText}>
                        <Text style={styles.name}>{user.fullname}</Text>
                        <Text style={styles.email}>{user.email}</Text>
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
