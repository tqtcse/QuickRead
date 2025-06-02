import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import WantToReadButton from "@/src/components/Button/WantToReadButton";
import CommentItem from "@/src/components/CommentItem";
import { useRouter } from 'expo-router';
import ExpandableText from "@/src/components/ExpandText";
import ExpandComment from "@/src/components/ExpandComment";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { useDispatch } from "react-redux";
import { getCommentById } from "@/src/store/user/userActions";
import { AppDispatch } from "@/src/store";
import { createComment } from "@/src/store/user/userActions";
import { getUserComment } from "@/src/store/user/userActions";
import { getLikedComments } from "@/src/store/user/userActions";
import { Dimensions } from "react-native";




const { width, height } = Dimensions.get("window");
const BookDetail: React.FC = () => {


    const [userRating, setUserRating] = useState<number>(0);
    const [commentText, setCommentText] = useState<string>('');
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();
    const comment = useSelector((state: RootState) => state.user.comment);
    const bookData = useSelector((state: RootState) => state.user.book);
    const token = useSelector((state: RootState) => state.user.token);
    const userComment = useSelector((state: RootState) => state.user.CommentByUser);
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const status = bookMarked?.find(book => book.bookId === id)?.status || '';
    const isBookMarked = !!status;
    const handleSubmitComment = async () => {
        if (userRating === 0) {
            Alert.alert('Thông báo', 'Vui lòng chọn số sao đánh giá');
            return;
        }
        if (commentText.trim() === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập nội dung bình luận');
            return;
        }

        try {
            if (token) {
                const response = await dispatch(createComment(id as string, userRating, commentText.trim(), token));
                await dispatch(getCommentById(id as string, token));
                await dispatch(getUserComment(id as string, token));
            }



        } catch (error) {
            Alert.alert('Lỗi', 'Không thể kết nối server');
        }
    };

    useEffect(() => {
        if (token) {
            dispatch(getCommentById(id as string, token));
            dispatch(getUserComment(id as string, token));
            dispatch(getLikedComments(id as string, token));
        }

    }, []);



    const book = bookData.find((b) => b._id === id) || bookData[0];

    const handleStarPress = (rating: number) => {
        setUserRating(rating);

    };


    const top5comments = comment.slice(0, 5);
    const handlePress = () => {
        router.push({
            pathname: "/home/book/reviewDetail/[id]",
            params: { id: book._id.toString() }
        });
    };



    return (
        <ScrollView

        >
            <View style={styles.container}>
                <Image source={{ uri: book.cover }} style={styles.cover} />
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>Author: {book.author}</Text>

                <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Text key={index} style={styles.star}>
                            {index < Math.round(book.rating) ? '★' : '☆'}
                        </Text>
                    ))}
                    <View><Text>{book.rating}</Text></View>
                    <Text>     {book.rating_count} ratings</Text>

                </View>

                <WantToReadButton isBookMarked={isBookMarked} id={id as string} status={status} />

                <Text style={styles.yourRaitng}>Your rating:</Text>
                {userComment && userComment.length > 0 ? (
                    <View style={{ width: '80%' }}>
                        <View style={styles.ratingContainer}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <Text key={index} style={[styles.star, { color: index < userComment[0].rating ? '#FFD700' : '#ccc' }]}>★</Text>
                            ))}
                            <Text>{userComment[0].rating}</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={[styles.commentDisplay, { textAlign: 'center', maxWidth: '100%' }]}
                                numberOfLines={undefined}
                            >
                                {userComment[0].text}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <>
                        <View style={styles.ratingContainer}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
                                    <Text style={[styles.star, { color: index < userRating ? '#FFD700' : '#ccc' }]}>★</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.commentInput}
                            multiline
                            placeholder="Write your comment..."
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComment}>
                            <Text style={styles.submitButtonText}>Send</Text>
                        </TouchableOpacity>
                    </>
                )}


                <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>BOOK DESCRIPTION</Text>
                <View style={styles.underline} />
                <Text style={styles.description}>
                    <ExpandableText text={book.description} numberOfLines={4} />
                </Text>


                <View style={styles.rateDetailContainer}>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 20 }}>Community Reviews</Text>

                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = comment.filter(c => c.rating === rating).length;
                            const total = comment.length;
                            const percentage = total === 0 ? 0 : (count / total) * 100;

                            return (
                                <View key={rating} style={styles.rateRow}>
                                    <Text style={styles.starText}>{rating} Star</Text>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.bar, { width: `${percentage}%` }]} />
                                    </View>
                                    <Text style={styles.rateCount}>{count} reviews</Text>
                                </View>
                            );
                        })}
                    </TouchableOpacity>
                </View>

                <View style={styles.parentCommentContainer}>
                    {top5comments.map((item, index) => (
                        <CommentItem
                            key={index}
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
                    ))}
                    <ExpandComment id={id as string} />
                </View>



            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: width * 0.05,
        backgroundColor: "#FAFAFA",
    },
    cover: {
        width: width * 0.5,
        height: height * 0.45,
        borderRadius: 12,
        marginBottom: 16,
        resizeMode: "cover",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
        color: "#333",
        textAlign: "center",
    },
    author: {
        fontSize: 16,
        color: "#777",
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: "#444",
        textAlign: "left",
        lineHeight: 22,
    },
    errorText: {
        fontSize: width * 0.045, // Scales with screen width (~18px on 400px wide screen)
        color: "red",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    star: {
        fontSize: width * 0.05, // Scales with screen width (~20px on 400px wide screen)
        color: "#FFD700", // Gold for stars
        marginRight: width * 0.005, // Small margin for spacing
        marginHorizontal: 2,
    },
    commentStar: {
        fontSize: width * 0.0375, // Scales with screen width (~15px on 400px wide screen)
        color: "#FFD700",
        marginRight: width * 0.005,
        alignItems: "center",
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "25%",
        marginVertical: 8,
    },
    yourRaitng: {
        fontSize: width * 0.05, // Scales with screen width (~20px on 400px wide screen)
        color: "#FFD700",
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 4,
    },
    parentCommentContainer: {
        flexDirection: "column",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginVertical: height * 0.01, // 1% of screen height
        width: "100%", // Full width
    },
    rateDetailContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4, // Android shadow
        marginVertical: 10,
    },
    rateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    starText: {
        width: 60,  // Cố định độ rộng để căn đều
        fontSize: 14,
        color: '#444',
    },

    barContainer: {
        flex: 1, // chiếm phần còn lại của hàng
        height: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
        marginHorizontal: 12,
        overflow: 'hidden',
    },

    bar: {
        height: '100%',
        backgroundColor: '#fbc02d', // vàng sáng giống sao
        borderRadius: 6,
    },

    rateCount: {
        width: 70, // cố định để text không nhảy lung tung
        fontSize: 13,
        color: '#666',
        textAlign: 'right',
    },
    commentInput: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        minHeight: 100,
        marginTop: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#2196F3",
        paddingVertical: height * 0.015, // 1.5% of screen height
        borderRadius: 8,
        marginTop: height * 0.015, // 1.5% of screen height
        alignItems: "center",
        width: width * 0.3, // 30% of screen width for button
    },
    submitButtonText: {
        width: width * 0.2, // 20% of screen width for text alignment
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: width * 0.04, // Scales with screen width (~16px on 400px wide screen)
    },
    commentDisplay: {
        fontSize: width * 0.04,
        color: "#333",
        flexShrink: 1,
        flexWrap: 'wrap',

        textAlign: 'center',
    },
});

export default BookDetail;
