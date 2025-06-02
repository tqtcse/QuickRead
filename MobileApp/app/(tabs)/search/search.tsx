import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import type Book from '@/app/@type/Book';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import BookItem from '@/src/components/BookItem';
import HorizontalList from '@/src/components/HorizontalList';

const SearchScreen = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Book[]>([]);
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [hideSection, setHideSection] = useState(false);
    const AllBook = useSelector((state: RootState) => state.user.book);
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);

    const bestBooks = useMemo(() => {
        return AllBook
            .filter(book => book.rating_count > 0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10);
    }, [AllBook]);

    const mostPopularBooks = useMemo(() => {
        return AllBook
            .filter(book => book.rating_count > 0)
            .sort((a, b) => b.rating_count - a.rating_count)
            .slice(0, 10);
    }, [AllBook]);

    const handleSearch = useCallback((text: string) => {
        if (!text) {
            setSuggestions([]);
            setSearchResults([]);
            setShowResult(false);
            return;
        }

        const filteredBooks = AllBook.filter(book =>
            book.title.toLowerCase().includes(text.toLowerCase()) ||
            book.author.toLowerCase().includes(text.toLowerCase())
        );

        setSuggestions(filteredBooks);
        setSearchResults(filteredBooks);
        setShowResult(false);
        setHideSection(true);
    }, [AllBook]);

    const handleSubmit = () => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResult(false);
            setHideSection(false);
            return;
        }

        const filteredBooks = AllBook.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredBooks);
        setSuggestions([]);
        setShowResult(true);
        setHideSection(true);
    };

    const onChangeText = (text: string) => {
        setQuery(text);
        handleSearch(text);
    };

    const handleSelect = (book: Book) => {
        setQuery(book.title);
        setSuggestions([]);
        setSearchResults([book]);
        setShowResult(true);
        setHideSection(true);
    };


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by title or author..."
                    placeholderTextColor="#999"
                    value={query}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        setHideSection(true);
                        setShowResult(false);
                    }}
                    onBlur={() => {
                        if (query.trim() === '') {
                            setHideSection(false);
                            setShowResult(false);
                        }
                    }}
                    onSubmitEditing={handleSubmit} // Xử lý khi nhấn Enter
                />
            </View>

            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item._id}
                    style={styles.suggestionList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.suggestionText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {showResult && searchResults.length > 0 && (
                <View>
                    <Text style={styles.sectionTitle}>Search Results</Text>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.bookList}
                        renderItem={({ item }) => (
                            <BookItem
                                item={item}
                                status={bookMarked?.find(book => book.bookId === item._id)?.status || ''}
                                isBookMarked={bookMarked?.some(book => book.bookId === item._id)}
                                onPress={() =>
                                    router.push({
                                        pathname: '/home/book/[id]',
                                        params: { id: item._id.toString() },
                                    })
                                }
                            />
                        )}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            )}

            {showResult && searchResults.length === 0 && (
                <View>
                    <Text style={styles.sectionTitle}>No Results Found</Text>
                </View>
            )}

            {!hideSection && (
                <View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>📚 Best Books</Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push({ pathname: "/search/section/[name]", params: { name: 'Best Books' } });
                            }}
                        >
                            <Text style={styles.moreIcon}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                    <HorizontalList data={bestBooks} pathname='/home/book/[id]' />


                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>📈 Most Popular Books</Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push({ pathname: "/search/section/[name]", params: { name: 'Most Popular Books' } });
                            }}
                        >
                            <Text style={styles.moreIcon}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                    <HorizontalList data={mostPopularBooks} pathname='/home/book/[id]' />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        fontSize: 16,
        color: '#111827',
    },
    suggestionList: {
        maxHeight: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    suggestionItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
    },
    suggestionText: {
        fontSize: 16,
        color: '#1F2937',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginVertical: 16,
    },
    bookList: {
        paddingBottom: 24,
    },
    bookItem: {
        width: 160,
        marginRight: 12,
        padding: 12,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    bookCover: {
        width: 120,
        height: 180,
        borderRadius: 10,
        marginBottom: 8,
        resizeMode: 'cover',
        borderWidth: 0.5,
        borderColor: '#E5E7EB',
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 8,
    },
    bookRating: {
        fontSize: 12,
        color: '#F59E0B',
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    moreIcon: {
        fontSize: 18,
        color: '#3B82F6',
        fontWeight: '500',
    },
});
export default SearchScreen;