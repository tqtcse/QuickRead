import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import WantToReadButton from '../../../src/components/Button/WantToReadButton';
import { getAllBooks } from '../../../src/services/bookApi';
// Cập nhật danh sách sách với thể loại (category)

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

// Nhóm sách theo thể loại


const HomeScreen: React.FC = () => {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [booksSectionData, setBooksSectionData] = useState<{ title: string, data: Book[] }[]>([]);



    const fetchBooks = async () => {
        try {
            const allBooks = await getAllBooks();

            // Nhóm theo category
            const grouped = allBooks.reduce((acc, book) => {
                if (!acc[book.category]) acc[book.category] = [];
                acc[book.category].push(book);
                return acc;
            }, {} as Record<string, Book[]>);

            // Lọc top 3 sách theo mỗi nhóm: ưu tiên rating, sau đó ratingAmount
            const sectionData = Object.entries(grouped).map(([category, books]) => {
                const topBooks = books
                    .sort((a, b) => {
                        if (b.rating !== a.rating) return b.rating - a.rating;
                        return b.ratingAmount - a.ratingAmount;
                    })
                    .slice(0, 3);

                const formattedCategory = category
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                return {
                    title: formattedCategory,
                    data: topBooks
                };
            });

            setBooksSectionData(sectionData);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recommended</Text>

            <SectionList
                sections={booksSectionData}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionHeader}>{title}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // Chuyển trang theo category
                                router.push({ pathname: "/home/category/[name]", params: { name: title.toLowerCase() } });
                            }}
                        >
                            <Text style={styles.moreIcon}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.bookItem} onPress={() => router.push({ pathname: "/home/book/[id]", params: { id: item.id } })}>
                        <Image source={{ uri: item.cover }} style={styles.bookCover} />
                        <View style={styles.bookInfo}>
                            <Text style={styles.bookTitle}>{item.title}</Text>
                            <Text style={styles.bookAuthor}>by {item.author}</Text>
                            <View style={styles.ratingContainer}>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Text key={index} style={styles.star} >
                                        {item.rating ? (index < item.rating ? '★' : '☆') : '☆'}
                                    </Text>
                                ))}
                            </View>
                            <View style={styles.buttonContainer}>
                                <WantToReadButton />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 5,
    },
    bookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    bookCover: {
        width: 60,
        height: 90,
        borderRadius: 5,
    },
    bookInfo: {

        marginLeft: 15,
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',

    },
    star: {
        fontSize: 18,
        color: '#FFD700', // Màu vàng cho sao
        marginRight: 2,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',  // Đẩy nút sang phải
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 5,
    },
    moreIcon: {
        top: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray', // màu xanh dương cho biểu tượng
    },
});

export default HomeScreen;
