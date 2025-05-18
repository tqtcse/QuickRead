import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const AgeScreen = () => {
    const [age, setAge] = useState<string>('');

    const handleContinue = () => {
        if (age && parseInt(age) > 0) {
            router.push('/(onboarding)/profileSetUp/bookGenreScreen');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your age!</Text>
            <Text style={styles.subtitle}>Enter your age for better content.</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your age"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                maxLength={3}
            />

            <TouchableOpacity
                style={[styles.button, { opacity: age ? 1 : 0.5 }]}
                onPress={handleContinue}
                disabled={!age}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AgeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: height * 0.1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        color: '#555',
    },
    input: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        fontSize: 16,
        color: '#000',
        marginBottom: 40,
        backgroundColor: '#f9f9f9',
    },
    button: {
        position: 'absolute',
        bottom: height * 0.05,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 100,
        width: width * 0.8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
