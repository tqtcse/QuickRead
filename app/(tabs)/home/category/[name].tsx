// app/home/category/[name].tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAllBooks } from '@/src/services/bookApi';
import BookItem from '@/src/components/BookItem';

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

const CategoryScreen = () => {
    const { name } = useLocalSearchParams(); // 👈 lấy param từ URL
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);


    console.log(name);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getAllBooks();

                const filtered = allBooks.filter(
                    (book) => book.category.toLowerCase() === String(name).toLowerCase()
                );

                setBooks(filtered);
            } catch (err) {
                console.error('Error fetching books:', err);
            }
        };

        fetchBooks();
    }, [name]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Books in: {name}</Text>

            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BookItem
                        item={item}
                        onPress={() =>
                            router.push({
                                pathname: '/home/book/[id]',
                                params: { id: item.id },
                            })
                        }
                    />
                )}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    console.log('onEndReached');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
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
});

export default CategoryScreen;
