import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Onboarding2 = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/onboard2.jpg')} style={styles.logo} />

            <Text style={styles.title}>Track Your Reading Progress</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>Log your reading journey and</Text>
                <Text style={styles.subtitle}>achieve your daily reading goals</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/(onboarding)/onboarding3')}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding2;

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
