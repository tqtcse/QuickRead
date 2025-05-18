import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Onboarding3 = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/onboard3.jpg')} style={styles.logo} />

            <Text style={styles.title}>Discover New Books</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Find and explore great books</Text>
                <Text style={styles.subtitle}>tailored to your interests!</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/(onboarding)/profileSetUp/genderScreen')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.buttonText}>I already have an account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding3;

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
        marginBottom: height * 0.01,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 100,
        width: width * 0.8,
        alignItems: 'center',
    },
    button2: {
        marginBottom: height * 0.0,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 100,
        width: width * 0.8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',

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
