import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import CommentItem from '@/src/components/CommentItem';
import BackButton from '@/src/components/Button/BackButton';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';


interface Comment {
    user: string;
    text: string;
    date: string;
    like: number;
    rating: number;
    book_id: string; // Thêm book_id để lọc comment theo sách
}

const ReviewDetail: React.FC = () => {
    const { id } = useLocalSearchParams();
    const bookData = useSelector((state: RootState) => state.user.book);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const comment = useSelector((state: RootState) => state.user.comment);

    const book = bookData.find((b) => b.id === id) || bookData[0];

    const calculatePercentage = (rating: number) => {
        const count = comment.filter(c => c.rating === rating && c.book_id === book.id).length;
        const total = comment.filter(c => c.book_id === book.id).length || 1;
        return (count / total) * 100;
    };

    const getSortedComments = () => {
        return comment
            .filter(c => c.book_id === book.id)
            // Lọc comment theo selectedRating nếu có
            .filter(c => selectedRating === null || c.rating === selectedRating)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const sortedComments = getSortedComments();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.rateDetailContainer}>
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Community Reviews</Text>
                    <View>
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const percentage = calculatePercentage(rating);
                            const count = comment.filter(c => c.rating === rating && c.book_id === book.id).length;
                            return (
                                <TouchableOpacity
                                    key={rating}
                                    onPress={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                    style={styles.rateRow}
                                >
                                    <Text style={styles.starText}>{rating} Star</Text>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.bar, { width: `${percentage}%` }]} />
                                    </View>
                                    <Text style={styles.rateCount}>{count} reviews</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.commentListWrapper}>
                    <FlatList
                        data={sortedComments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CommentItem item={item} />}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        width: '100%',
        flex: 1
    },
    innerContainer: {
        width: '100%',
        flex: 1
    },
    buttonContainer: {
        marginBottom: 56,
    },
    rateDetailContainer: {
        // marginTop: -35,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    rateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    starText: {
        fontSize: 16,
        color: '#333',
        width: 60,
    },
    barContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#ccc',
        borderRadius: 4,
        marginHorizontal: 10,
    },
    bar: {
        height: '100%',
        backgroundColor: '#FFD700',
        borderRadius: 4,
    },
    rateCount: {
        fontSize: 14,
        color: '#666',
    },
    commentListWrapper: {
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginVertical: 5,
        width: '100%',
    },
});

export default ReviewDetail;