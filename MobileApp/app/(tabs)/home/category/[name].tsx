import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAllBooks } from '@/src/services/bookApi';
import BookItem from '@/src/components/BookItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import type Book from '@/app/@type/Book';

const ratingOptions = [5, 4, 3, 2, 1];

const CategoryScreen = () => {
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const AllBook = useSelector((state: RootState) => state.user.book)
    const { name } = useLocalSearchParams();
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        if (filterBooks) {
            setFilteredBooks(filterBooks);
        }
    }, []);

    const filterBooks = AllBook?.filter((book) => book.category.toLowerCase() === String(name).toLowerCase())


    const handleFilterByRating = (rating: number | null) => {
        setSelectedRating(rating);
        setShowFilterModal(false);

        if (rating === null) {
            setFilteredBooks(filterBooks);
        } else {
            let result: Book[] = [];
            if (rating === 5) {

                result = filterBooks.filter((book) => Math.floor(book.rating) === 5);
            } else {
                result = filterBooks.filter((book) => book.rating >= rating);
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
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <BookItem
                        item={item}
                        status={bookMarked?.find(book => book.bookId === item._id)?.status || ''}
                        isBookMarked={bookMarked?.some(book => book.bookId === item._id)}
                        onPress={() =>
                            router.push({
                                pathname: '/home/book/[id]',
                                params: { id: item._id },
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
                <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
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
                </TouchableWithoutFeedback>

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
