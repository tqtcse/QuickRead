import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

// Danh sách sách giả lập (có thể thay bằng API)
const books = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://source.unsplash.com/200x300/?book", description: "A classic novel set in the Jazz Age." },
    { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://source.unsplash.com/200x300/?novel", description: "A powerful novel about racial injustice." },
    { id: "3", title: "1984", author: "George Orwell", cover: "https://source.unsplash.com/200x300/?dystopian", description: "A dystopian tale of surveillance and control." },
    { id: "4", title: "Moby-Dick", author: "Herman Melville", cover: "https://source.unsplash.com/200x300/?ocean", description: "A story of obsession and revenge at sea." },
];

const BookDetail: React.FC = () => {
    const { id } = useLocalSearchParams(); // Lấy ID từ URL

    // Tìm sách theo ID
    const book = books.find((b) => b.id === id);

    if (!book) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Không tìm thấy sách! 📚</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: book.cover }} style={styles.cover} />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>Tác giả: {book.author}</Text>
            <Text style={styles.description}>{book.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    cover: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        color: "#333",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
});

export default BookDetail;
