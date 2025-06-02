import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import CommentItem from '@/src/components/CommentItem';
import { useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';
import { getCommentById } from '@/src/store/user/userActions';
import { getLikedComments } from '@/src/store/user/userActions';
import { getUserComment } from '@/src/store/user/userActions';



const ReviewDetail: React.FC = () => {
    const { id } = useLocalSearchParams();

    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const comment = useSelector((state: RootState) => state.user.comment);
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        if (token) {
            dispatch(getUserComment(id as string, token));
            dispatch(getLikedComments(id as string, token));
            dispatch(getCommentById(id as string, token));
        }


    }, []);


    return (

        <View style={styles.container}>

            <View style={styles.rateDetailContainer}>
                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Community Reviews</Text>
                <View>
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = comment.filter(c => c.rating === rating).length;
                        const total = comment.length;
                        const percentage = total === 0 ? 0 : (count / total) * 100;
                        const isDimmed = selectedRating !== null && selectedRating !== rating;

                        return (
                            <TouchableOpacity
                                key={rating}
                                onPress={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                style={[styles.rateRow, isDimmed && { opacity: 0.4 }]}
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
                    data={selectedRating === null ? comment : comment.filter(c => c.rating === selectedRating)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <CommentItem
                            item={{
                                _id: item._id,
                                book_id: item.book_id,
                                text: item.text,
                                rating: item.rating,
                                updatedAt: item.updatedAt,
                                like_counts: item.like_counts,
                                user_id: {
                                    username: item.user_id.username,
                                    avatar_url: item.user_id.avatar_url
                                }
                            }}
                        />
                    }
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#fafafa',
        width: '100%',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginBottom: 16,
    },

    rateDetailContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 16,
    },

    rateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    dimmed: {
        opacity: 0.4,
    },

    starText: {
        width: 60,
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
    },

    barContainer: {
        flex: 1,
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginHorizontal: 12,
        overflow: 'hidden',
    },

    bar: {
        height: '100%',
        backgroundColor: '#fbc02d',
        borderRadius: 5,
    },

    rateCount: {
        width: 80,
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
        fontWeight: '500',
    },

    commentListWrapper: {
        flex: 1,
        marginTop: 10,
        width: '100%',
    },
});

export default ReviewDetail;