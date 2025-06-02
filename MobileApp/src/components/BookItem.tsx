import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import WantToReadButton from '@/src/components/Button/WantToReadButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type Book from '@/app/@type/Book';

type Props = {
    item: Book;
    onPress: () => void;
    isBookMarked: boolean;
    status: string;
};

const BookItem = React.memo(({ item, onPress, isBookMarked, status }: Props) => (


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
                                color="rgb(234, 216, 25)"
                                style={styles.starIcon}
                            />
                        );
                    } else if (index === fullStars && hasHalfStar) {
                        return (
                            <MaterialIcons
                                key={index}
                                name="star-half"
                                size={20}
                                color="rgb(234, 216, 25)"
                                style={styles.starIcon}
                            />
                        );
                    } else {
                        return (
                            <MaterialIcons
                                key={index}
                                name="star-border"
                                size={20}
                                color="rgb(234, 216, 25)"
                                style={styles.starIcon}
                            />
                        );
                    }
                })}
            </View>

            {/* 📚 Nút muốn đọc */}
            <View style={styles.buttonContainer}>
                <WantToReadButton isBookMarked={isBookMarked} id={item._id} status={status} />

            </View>
        </View>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    bookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginVertical: 8,
        marginHorizontal: 2,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // padding: 10,
        // backgroundColor: '#f3f3f3',
        // borderRadius: 8,
    },
    bookCover: {
        width: 70,
        height: 100,
        borderRadius: 6,
        resizeMode: 'cover',
    },
    bookInfo: {
        marginLeft: 16,
        flex: 1,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1f2937'
    },
    bookAuthor: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 6,
    },
    star: { fontSize: 18, color: '#FFD700', marginRight: 2 },
    buttonContainer: { marginTop: 8, alignItems: 'flex-end' },
    starIcon: {
        marginRight: 2,
    },
});

export default BookItem;
