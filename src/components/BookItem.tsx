import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import WantToReadButton from '@/src/components/Button/WantToReadButton';

type Book = {
    id: string;
    title: string;
    author: string;
    category: string;
    cover: string;
    description: string;
    rating: number;
    ratingAmount: number;
    reviewAmount: number;
};

type Props = {
    item: Book;
    onPress: () => void;
};

const BookItem = React.memo(({ item, onPress }: Props) => (
    <TouchableOpacity style={styles.bookItem} onPress={onPress}>
        <Image source={{ uri: item.cover }} style={styles.bookCover} />
        <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>by {item.author}</Text>

            {/* ⭐️ Số sao */}
            <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }, (_, index) => (
                    <Text key={index} style={styles.star}>
                        {item.rating ? (index < item.rating ? '★' : '☆') : '☆'}
                    </Text>
                ))}
            </View>

            {/* 📚 Nút muốn đọc */}
            <View style={styles.buttonContainer}>
                <WantToReadButton />
            </View>
        </View>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    bookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
    },
    bookCover: { width: 60, height: 90, borderRadius: 5 },
    bookInfo: { marginLeft: 15, flex: 1 },
    bookTitle: { fontSize: 16, fontWeight: 'bold' },
    bookAuthor: { fontSize: 14, color: '#666' },
    ratingContainer: { flexDirection: 'row', marginTop: 4 },
    star: { fontSize: 18, color: '#FFD700', marginRight: 2 },
    buttonContainer: { marginTop: 8, alignItems: 'flex-end' },
});

export default BookItem;
