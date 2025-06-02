import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BookItem from '@/src/components/BookItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import type Book from '@/app/@type/Book';



const SectionScreen = () => {
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const AllBook = useSelector((state: RootState) => state.user.book)
    const { name } = useLocalSearchParams();
    const router = useRouter();
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState<'week' | 'month' | 'year' | null>(null);
    useEffect(() => {
        if (filterBooks) {
            setFilteredBooks(filterBooks);
        }
    }, []);

    const bestBooks = useMemo(() => {
        return AllBook
            .filter(book => book.rating_count > 0)
            .sort((a, b) => b.rating - a.rating)
    }, [AllBook])

    const mostPopularBooks = useMemo(() => {
        return AllBook
            .filter(book => book.rating_count > 0)
            .sort((a, b) => b.rating_count - a.rating_count)
    }, [AllBook]);


    const nameSection = String(name).toLowerCase()
    let filterBooks: Book[] = []
    if (nameSection === 'best books') {
        filterBooks = bestBooks
    } else if (nameSection === 'most popular books') {
        filterBooks = mostPopularBooks
    }

    if (selectedTime) {
        filterBooks = filterBooks.filter((book: Book) => {
            const currentDate = new Date()
            const bookDate = new Date(book.updatedAt)
            const diffTime = Math.abs(currentDate.getTime() - bookDate.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            if (selectedTime === 'week') {
                return diffDays <= 7
            } else if (selectedTime === 'month') {
                return diffDays <= 30
            } else if (selectedTime === 'year') {
                return diffDays <= 365
            }

        })
    }


    const timeOptions = [

        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' },
    ];

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

            <Modal visible={showFilterModal} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalCard}>
                                <Text style={styles.modalTitle}>Sort by Time</Text>

                                {timeOptions.map((opt) => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        onPress={() => {
                                            setSelectedTime(opt.value as 'week' | 'month' | 'year');
                                            setShowFilterModal(false);
                                        }}
                                        style={[
                                            styles.timeOption,
                                            selectedTime === opt.value && styles.selectedOption,
                                        ]}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.optionLabel}>{opt.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: '#f9fafb', // sáng nhẹ, giúp sách nổi bật hơn
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827', // neutral-900
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },


    modalContent: {
        width: '75%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
        color: '#1f2937',
    },

    timeOption: {
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 10,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#f3f4f6',
        borderColor: '#9ca3af',
    },

    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
});

export default SectionScreen;
