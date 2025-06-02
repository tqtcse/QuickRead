import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BookItem from '@/src/components/BookItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import type Book from '@/app/@type/Book';
import { TouchableWithoutFeedback } from 'react-native';

const ratingOptions = [5, 4, 3, 2, 1];

const LibraryScreen = () => {
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const { name } = useLocalSearchParams();
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const AllBook = useSelector((state: RootState) => state.user.book);



    const statusMap: Record<string, string> = {
        "Want to Read": "want_to_read",
        "Currently Reading": "reading",
        "Read": "read",
    }

    const filterBooksMarked = bookMarked?.filter((book) => book.status === statusMap[name as string]);




    const filterBooks = AllBook?.filter((book) => filterBooksMarked?.some((bookMarked) => bookMarked.bookId === book._id));



    useEffect(() => {
        if (filterBooks) {
            setFilteredBooks(filterBooks);
        }
    }, []);
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
                <Text style={styles.header}> {name}</Text>
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
                        status={statusMap[name as string]}
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
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '75%',
        backgroundColor: '#fff',
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 16,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalTitle: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        color: '#111827',
    },
    ratingOption: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginBottom: 8,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selectedOption: {
        backgroundColor: '#e0f2fe',
        borderWidth: 1.5,
        borderColor: '#38bdf8',
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1f2937',
    },
});

export default LibraryScreen;
