import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import WantToReadButton from '@/src/components/Button/WantToReadButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

type Props = {
    item: Book;
    onPress: () => void;
    isBookMarked: boolean;
};

const BookItem = React.memo(({ item, onPress, isBookMarked }: Props) => (


    <TouchableOpacity style={styles.bookItem} onPress={onPress}>
        <Image source={{ uri: item.cover }} style={styles.bookCover} />
        <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>by {item.author}</Text>
            <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }, (_, index) => {
                    const fullStars = Math.floor(item.rating);
                    const hasHalfStar = item.rating - fullStars >= 0.5;

                    if (index < fullStars) {
                        return (
                            <MaterialIcons
                                key={index}
                                name="star"
                                size={20}
                                color="yellow"
                                style={styles.starIcon}
                            />
                        );
                    } else if (index === fullStars && hasHalfStar) {
                        return (
                            <MaterialIcons
                                key={index}
                                name="star-half"
                                size={20}
                                color="yellow"
                                style={styles.starIcon}
                            />
                        );
                    } else {
                        return (
                            <MaterialIcons
                                key={index}
                                name="star-border"
                                size={20}
                                color="yellow"
                                style={styles.starIcon}
                            />
                        );
                    }
                })}
            </View>

            {/* 📚 Nút muốn đọc */}
            <View style={styles.buttonContainer}>
                <WantToReadButton isBookMarked={isBookMarked} />
            </View>
        </View>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
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
    ratingContainer: { flexDirection: 'row', marginTop: 4 },
    star: { fontSize: 18, color: '#FFD700', marginRight: 2 },
    buttonContainer: { marginTop: 8, alignItems: 'flex-end' },
    starIcon: {
        marginRight: 2,
    },
});

export default BookItem;
