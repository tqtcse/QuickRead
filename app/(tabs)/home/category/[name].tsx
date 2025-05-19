import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAllBooks } from '@/src/services/bookApi';
import BookItem from '@/src/components/BookItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';

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

const ratingOptions = [5, 4, 3, 2, 1];

const CategoryScreen = () => {
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const { name } = useLocalSearchParams();
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getAllBooks();

                const categoryBooks = allBooks.filter(
                    (book) => book.category.toLowerCase() === String(name).toLowerCase()
                );

                setBooks(categoryBooks);
                setFilteredBooks(categoryBooks);
            } catch (err) {
                console.error('Error fetching books:', err);
            }
        };

        fetchBooks();
    }, [name]);

    const handleFilterByRating = (rating: number | null) => {
        setSelectedRating(rating);
        setShowFilterModal(false);

        if (rating === null) {
            setFilteredBooks(books);
        } else {
            let result: Book[] = [];
            if (rating === 5) {

                result = books.filter((book) => Math.floor(book.rating) === 5);
            } else {
                result = books.filter((book) => book.rating >= rating);
            }
            setFilteredBooks(result);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header with Filter Icon */}
            <View style={styles.headerRow}>
                <Text style={styles.header}>Books in: {name}</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(true)}>
                    <Icon name="filter-list" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BookItem
                        item={item}
                        isBookMarked={bookMarked?.some(book => book.id === item.id)}
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
            />

            {/* Modal chọn rating */}
            <Modal visible={showFilterModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filter by rating</Text>
                        <TouchableOpacity
                            onPress={() => handleFilterByRating(null)}
                            style={[
                                styles.ratingOption,
                                selectedRating === null && styles.selectedOption,
                            ]}
                        >
                            <Text style={styles.optionLabel}>All</Text>
                        </TouchableOpacity>
                        {ratingOptions.map((r) => {
                            const isSelected = selectedRating === r;
                            return (
                                <TouchableOpacity
                                    key={r}
                                    onPress={() => handleFilterByRating(r)}
                                    style={[
                                        styles.ratingOption,
                                        isSelected && styles.selectedOption
                                    ]}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={styles.optionLabel}>
                                            {r === 5 ? '= 5' : `≥ ${r}`}
                                        </Text>
                                        <Icon name="star" size={18} color="#FFD700" style={{ marginLeft: 4 }} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    header: { fontSize: 18, fontWeight: 'bold' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '50%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,

    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
    optionText: {
        fontSize: 16,
        paddingVertical: 8,
        textAlign: 'center',
        backgroundColor: 'rgba(209, 198, 198, 0.3)',
        marginBottom: 4,
        borderRadius: 10,

    },
    ratingOption: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(209, 198, 198, 0.3)',
        marginBottom: 6,
        borderRadius: 10,
        alignItems: 'center',
    },

    selectedOption: {
        backgroundColor: '#FFEB99', // Vàng nhạt
    },

    optionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6,
        color: '#333',
    },
});

export default CategoryScreen;
