import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Onboarding1 = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

            <Text style={styles.title}>Welcome to QuickRead!</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Discover the world of books</Text>
                <Text style={styles.subtitle}>Read, review, and save your favorites!</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/(onboarding)/onboarding2')}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafc',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: width * 0.7,
        height: height * 0.35,
        resizeMode: 'contain',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2937', // slate-800
        marginBottom: 12,
    },
    subtitleContainer: {
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280', // slate-500
        textAlign: 'center',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#4f46e5', // indigo-600
        paddingVertical: 14,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
