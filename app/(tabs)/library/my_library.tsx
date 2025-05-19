import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import BookItem from '@/src/components/BookItem';
import { router } from 'expo-router';
import { RootState } from '@/src/store';
import { useSelector } from 'react-redux';



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

const booksOfUser = [
    {
        "id": "ROM001",
        "title": "Love in Paris",
        "author": "Sophie Lane",
        "category": "romance",
        "cover": "http://example.com/loveinparis.jpg",
        "description": "A heartwarming romance set in the city of love.",
        "rating": 4.2,
        "ratingAmount": 120,
        "reviewAmount": 45
    },
    {
        "id": "ROM002",
        "title": "Letters to Juliet",
        "author": "Emma Rose",
        "category": "romance",
        "cover": "http://example.com/letterstojuliet.jpg",
        "description": "An epistolary journey of love and longing.",
        "rating": 4.0,
        "ratingAmount": 85,
        "reviewAmount": 30
    },
    {
        "id": "ROM003",
        "title": "Seasons of Love",
        "author": "Clara Bennet",
        "category": "romance",
        "cover": "http://example.com/seasonsoflove.jpg",
        "description": "A tale of love through spring, summer, fall and winter.",
        "rating": 3.3,
        "ratingAmount": 95,
        "reviewAmount": 38
    },
    {
        "id": "ROM004",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "romance",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
] as Book[];

const [books, setBooks] = useState<Book[]>([]);
const [bookMarked, setBookMarked] = useState<Book[]>([]);

const MyLibrary = () => {

    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);

    // useEffect(() => {
    //     setBooks(booksOfUser);
    // }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>My Library</Text>
            </View>
            <FlatList
                data={booksOfUser}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <BookItem
                        item={item}
                        onPress={() => router.push({
                            pathname: '/home/book/[id]',
                            params: { id: item.id },
                        })}
                        isBookMarked={bookMarked?.some(book => book.id === item.id)}
                    />}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default MyLibrary;
