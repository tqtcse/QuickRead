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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: width * 0.8,
        height: height * 0.6,
        resizeMode: 'contain',

        borderRadius: 100,
    },
    button: {
        marginBottom: height * 0.0,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 100,
        width: width * 0.8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 1,
    },
    subtitleContainer: {
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 16,

    },
});
