import React, { useState, useMemo } from 'react';
import {
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import debounce from 'lodash.debounce';

const booksData = [
    {
        id: 'ROM001',
        title: 'Love in Paris',
        author: 'Sophie Lane',
        category: 'romance',
        cover: 'http://example.com/loveinparis.jpg',
        description: 'A heartwarming romance set in the city of love.',
        rating: 4.2,
        ratingAmount: 120,
        reviewAmount: 45,
    },
    {
        id: 'ROM002',
        title: 'Letters to Juliet',
        author: 'Emma Rose',
        category: 'romance',
        cover: 'http://example.com/letterstojuliet.jpg',
        description: 'An epistolary journey of love and longing.',
        rating: 4.0,
        ratingAmount: 85,
        reviewAmount: 30,
    },
    {
        id: 'ROM003',
        title: 'Seasons of Love',
        author: 'Clara Bennet',
        category: 'romance',
        cover: 'http://example.com/seasonsoflove.jpg',
        description: 'A tale of love through spring, summer, fall and winter.',
        rating: 4.3,
        ratingAmount: 95,
        reviewAmount: 38,
    },
    {
        id: 'ROM004',
        title: 'Sunset Kisses',
        author: 'Noah Walker',
        category: 'romance',
        cover: 'http://example.com/sunsetkisses.jpg',
        description: 'A summer romance that lingers long after the sun sets.',
        rating: 4.5,
        ratingAmount: 150,
        reviewAmount: 60,
    },
];

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

const SearchScreen = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Book[]>([]);

    // Debounced search
    const handleSearch = useMemo(
        () =>
            debounce((text: string) => {
                if (!text) {
                    setSuggestions([]);
                    return;
                }

                const lowerText = text.toLowerCase();
                const results = booksData.filter((book) =>
                    book.title.toLowerCase().includes(lowerText)
                );

                setSuggestions(results.slice(0, 5)); // Hiển thị tối đa 5 gợi ý
            }, 300),
        []
    );

    const onChangeText = (text: string) => {
        setQuery(text);
        handleSearch(text);
    };

    const handleSelect = (bookId: string) => {
        setQuery('');
        setSuggestions([]);
        router.push({ pathname: '/home/book/[id]', params: { id: bookId } });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for books..."
                value={query}
                onChangeText={onChangeText}
            />

            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleSelect(item.id)}
                        >
                            <Text style={styles.suggestionText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    searchInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 10,
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    suggestionText: {
        fontSize: 16,
    },
});

export default SearchScreen;
