import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setRegisterData } from '@/src/store/user/userSlice';
const { width, height } = Dimensions.get('window');

const BookGenreScreen = () => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const dispatch = useDispatch();

    const genres = [
        { label: 'Romance', value: 'Romance' },
        { label: 'Mystery', value: 'Mystery' },
        { label: 'Programming', value: 'Programming' },
        { label: 'Horror', value: 'Horror' },
        { label: 'Science', value: 'Science' },
        { label: 'Psychology', value: 'Psychology' },
        { label: 'Inspiration', value: 'Inspiration' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Fiction', value: 'Fiction' },
        { label: 'Comics', value: 'Comics' },
    ];

    const toggleGenre = (value: string) => {
        if (selectedGenres.includes(value)) {
            setSelectedGenres((prev) => prev.filter((v) => v !== value));
        } else {
            setSelectedGenres((prev) => [...prev, value]);
        }
    };

    const handleContinue = () => {
        dispatch(setRegisterData({ genres: selectedGenres }));
        router.push('/(onboarding)/profileSetUp/completedProfile');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose the book genre you like!</Text>
            <Text style={styles.subtitle}>
                Select genres for better recommendations, or skip.
            </Text>

            <View style={styles.optionsContainer}>
                {genres.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.optionButton,
                            selectedGenres.includes(item.value) && styles.optionSelected,
                        ]}
                        onPress={() => toggleGenre(item.value)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedGenres.includes(item.value) && styles.optionTextSelected,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Buttons row: Continue + Skip */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: selectedGenres.length > 0 ? 1 : 0.5 },
                    ]}
                    onPress={handleContinue}
                    disabled={selectedGenres.length === 0}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinue}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookGenreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: height * 0.05,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        color: '#555',
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    optionButton: {
        width: '48%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    optionSelected: {
        backgroundColor: '#e6f0ff',
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 13,
        color: '#007AFF',
        textAlign: 'center',
    },
    optionTextSelected: {
        fontWeight: 'bold',
    },
    buttonRow: {
        position: 'absolute',
        bottom: height * 0.05,
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: '#007AFF',
    },
    buttonText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    skipText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
    },
});
