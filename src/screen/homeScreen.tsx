import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import WantToReadButton from '../components/Button/WantToReadButton';

// Cập nhật danh sách sách với thể loại (category)
const books = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Tiểu thuyết', cover: 'https://images.squarespace-cdn.com/content/v1/624da83e75ca872f189ffa42/1660938091838-OPRIN3NA7SEHYSW7VSDH/image001.jpg', rating: 5 },
    {
        id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Tiểu thuyết', cover: 'https://m.media-amazon.com/images/I/416toFaYhUL._SL500_.jpg',
        rating: 4
    },
    { id: '3', title: '1984', author: 'George Orwell', category: 'Khoa học viễn tưởng', cover: 'https://source.unsplash.com/100x150/?dystopian', rating: 4 },
    { id: '4', title: 'Moby-Dick', author: 'Herman Melville', category: 'Kinh điển', cover: 'https://source.unsplash.com/100x150/?ocean', rating: 5 },
    { id: '5', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Khoa học', cover: 'https://source.unsplash.com/100x150/?history', rating: 3 },
    { id: '6', title: 'The Lean Startup', author: 'Eric Ries', category: 'Kinh doanh', cover: 'https://source.unsplash.com/100x150/?business', rating: 3 },
];

// Nhóm sách theo thể loại
const groupedBooks = books.reduce((acc, book) => {
    const categoryIndex = acc.findIndex((group) => group.title === book.category);
    if (categoryIndex !== -1) {
        acc[categoryIndex].data.push(book);
    } else {
        acc.push({ title: book.category, data: [book] });
    }
    return acc;
}, [] as { title: string; data: typeof books }[]);

const HomeScreen: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📚 Danh mục sách</Text>

            <SectionList
                sections={groupedBooks}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.bookItem} onPress={() => router.push({ pathname: "/book/[id]", params: { id: item.id } })}>
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
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
});

export default HomeScreen;
