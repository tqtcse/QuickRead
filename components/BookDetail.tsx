import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const books = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://source.unsplash.com/200x300/?book', description: 'A novel about the American dream.' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://source.unsplash.com/200x300/?novel', description: 'A story about racial injustice in the Deep South.' },
    { id: '3', title: '1984', author: 'George Orwell', cover: 'https://source.unsplash.com/200x300/?dystopian', description: 'A dystopian novel about totalitarianism.' },
    { id: '4', title: 'Moby-Dick', author: 'Herman Melville', cover: 'https://source.unsplash.com/200x300/?ocean', description: 'A quest to hunt the great white whale.' },
];

const BookDetail: React.FC = () => {
    const { id } = useLocalSearchParams(); // Lấy ID từ URL
    const book = books.find((b) => b.id === id); // Tìm sách theo ID

    if (!book) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>📚 Không tìm thấy sách!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: book.cover }} style={styles.cover} />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            <Text style={styles.description}>{book.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    cover: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    author: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    error: {
        fontSize: 18,
        color: 'red',
    },
});

export default BookDetail;
