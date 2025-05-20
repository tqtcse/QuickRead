import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setRegisterData } from '@/src/store/userSlice';
const { width, height } = Dimensions.get('window');

const GenderScreen = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const dispatch = useDispatch();

    const genders = [
        { label: 'I am male', value: 'male' },
        { label: 'I am female', value: 'female' },
        { label: 'Rather not to say', value: 'none' },
    ];

    const handleContinue = () => {
        dispatch(setRegisterData({ gender: selectedGender }));
        router.push('/(onboarding)/profileSetUp/bookGenreScreen');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is your gender?</Text>
            <Text style={styles.subtitle}>Select your gender</Text>

            <View style={styles.optionsContainer}>
                {genders.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.optionButton,
                            selectedGender === item.value && styles.optionSelected,
                        ]}
                        onPress={() => setSelectedGender(item.value)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedGender === item.value && styles.optionTextSelected,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleContinue}
                disabled={!selectedGender}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GenderScreen;

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
    optionsContainer: {
        width: '100%',
        gap: 15,
        marginBottom: 50,
    },
    optionButton: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    optionSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    optionTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
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
