import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import WantToReadButton from "@/src/components/Button/WantToReadButton";
import CommentItem from "@/src/components/CommentItem";
import { useRouter } from 'expo-router';
import ExpandableText from "@/src/components/ExpandText";
import ExpandComment from "@/src/components/ExpandComment";
// Danh sách sách giả lập (có thể thay bằng API)

interface Comment {
    user: string;
    text: string;
    date: string;
    like: number;
    rating: number;
}

interface RateDetail {
    [key: number]: { count: number; comments: Comment[] };
}


interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    cover: string;
    rating: number;
    description: string;
    ratingAmount: number;
    reviewAmount: number;
    rateDetail: RateDetail;
}


const convertToTimestamp = (date: string | Date): number => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
        throw new Error("Ngày không hợp lệ");
    }
    return dateObj.getTime();
};


const books: Book[] = [
    {
        id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Tiểu thuyết', cover: 'https://images.squarespace-cdn.com/content/v1/624da83e75ca872f189ffa42/1660938091838-OPRIN3NA7SEHYSW7VSDH/image001.jpg', rating: 5, description: `Ở một bờ biển xa xôi, nơi sóng vỗ miên man suốt ngày đêm, có một hạt cát nhỏ bé nằm lẫn trong hàng triệu, hàng tỷ hạt cát khác. Nó chẳng có gì đặc biệt – chỉ là một hạt cát nhỏ, lặng lẽ chịu đựng sự xô đẩy của sóng biển và gió trời.

Nhưng rồi một ngày, một cơn bão mạnh quét qua bãi biển, những con sóng hung dữ cuốn phăng mọi thứ trên đường đi của nó. Hạt cát bị cuốn vào dòng nước xiết, trôi dạt đi thật xa, vượt qua bãi biển mà nó đã quen thuộc suốt bao năm trời. Nó sợ hãi, nhưng cũng háo hức – lần đầu tiên trong đời, nó được rời khỏi chốn cũ để khám phá thế giới bao la ngoài kia.

Dòng nước đưa nó đến một vùng đất mới, nơi nó lắng xuống một con sông hiền hòa. Ở đó, nó gặp những hạt cát khác, những hòn sỏi lấp lánh, những chú cá nhỏ bơi lội tung tăng. Con sông chở nó đi qua những cánh rừng rậm rạp, những thảo nguyên bát ngát, qua những ngôi làng nhỏ bé và những cây cầu cổ kính. Nó chứng kiến cuộc sống muôn màu muôn vẻ của con người, của thiên nhiên, của cả những sinh vật nhỏ bé mà trước đây nó chưa từng biết đến.`,
        ratingAmount: 10, reviewAmount: 2, rateDetail: {
            1: { count: 1, comments: [{ user: "John", text: "Not good", date: "2025-04-02T15:00:00Z", like: 100, rating: 1 }] },
            2: { count: 3, comments: [{ user: "Alice", text: "Could be better", date: "2025-04-03T10:00:00Z", like: 100, rating: 2 }] },
            3: { count: 1, comments: [{ user: "Bob", text: "Average", date: "2025-04-01T08:30:00Z", like: 100, rating: 3 }] },
            4: { count: 1, comments: [{ user: "Charlie", text: "Liked it", date: "2025-04-01T08:30:00Z", like: 100, rating: 4 }] },
            5: { count: 5, comments: [{ user: "David", text: "Amazing book!", date: "2025-04-01T08:30:00Z", like: 100, rating: 5 }, { user: "Eva", text: "Loved it! Dòng nước đưa nó đến một vùng , n ", date: "2025-04-03T18:00:00Z", like: 9, rating: 5 }] }
        }
    },

];

const BookDetail: React.FC = () => {

    const [userRating, setUserRating] = useState<number>(0);
    const { id } = useLocalSearchParams(); // Lấy ID từ URL
    const router = useRouter();

    const handleStarPress = (rating: number) => {
        setUserRating(rating);
        console.log(rating)
    };
    const calculatePercentage = (count: number) => {
        const totalReviews = book.ratingAmount || 1; // Đảm bảo không chia cho 0
        return (count / totalReviews) * 100;
    };
    const getAllComments = (rateDetail: any) => {
        let allComments: any[] = [];

        for (const rate in rateDetail) {
            if (rateDetail[rate]?.comments) {
                allComments = [...allComments, ...rateDetail[rate].comments];
            }
        }

        allComments.sort((a, b) => convertToTimestamp(b.date) - convertToTimestamp(a.date));
        return allComments;
    };

    const book = books[0];
    const sortedComments = getAllComments(book.rateDetail);
    const handlePress = () => {
        router.push({ pathname: "/book/reviewDetail/[id]", params: { id: 1 } })
    }
    const top5comments = sortedComments.slice(0, 5);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <Image source={{ uri: book.cover }} style={styles.cover} />
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>Author: {book.author}</Text>

                <View style={styles.ratingContainer}>

                    {Array.from({ length: 5 }, (_, index) => (
                        <Text key={index} style={styles.star} >

                            {book.rating ? (index < book.rating ? '★' : '☆') : '☆'}
                        </Text>
                    ))}
                    <View>
                        <Text> {book.rating} </Text>
                    </View>

                    <Text>     {book.ratingAmount} ratings </Text>
                    <Text>     {book.reviewAmount} reviews</Text>
                </View>

                <WantToReadButton />

                <Text style={styles.yourRaitng}>Your rating:</Text>
                <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
                            <Text style={[styles.star, { color: index < userRating ? '#FFD700' : '#ccc' }]}>
                                ★
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={{ marginVertical: 10 }}>BOOK DESCRIPTION</Text>
                <View style={styles.underline} />
                <Text style={styles.description}>
                    <ExpandableText text={book.description} numberOfLines={4} />

                </Text>

                <View style={styles.rateDetailContainer}>

                    <TouchableOpacity onPress={handlePress} >
                        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Community Reviews</Text>
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const percentage = calculatePercentage(book.rateDetail[rating].count || 0);
                            return (

                                <View key={rating} style={styles.rateRow}>
                                    <Text style={styles.starText}>{rating} Star</Text>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.bar, { width: `${percentage}%` }]} />
                                    </View>
                                    <Text style={styles.rateCount}>{book.rateDetail[rating].count || 0} reviews</Text>


                                </View>


                            );
                        })}
                    </TouchableOpacity>
                </View >
                <View style={styles.parentCommentContainer} >
                    <FlatList
                        data={top5comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CommentItem item={item} />}
                    />
                    <ExpandComment />
                </View>
                <View>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    cover: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: "left",
        color: "#333",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
        color: 'rgba(92, 90, 90, 0.94)',
    },
    star: {
        fontSize: 20,
        color: '#FFD700', // Màu vàng cho sao
        marginRight: 2,
        alignItems: 'center'
    },
    commentStar: {
        fontSize: 15,
        color: '#FFD700', // Màu vàng cho sao
        marginRight: 2,
        alignItems: 'center'
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '25%',
        marginVertical: 5,
        marginBottom: 25
    },
    yourRaitng: {
        fontSize: 20,
        color: '#FFD700', // Màu vàng cho sao
        marginRight: 2,
        alignItems: 'center',
        marginTop: 10
    },
    parentCommentContainer: {
        flexDirection: 'column',
        borderTopWidth: 1, // Viền mỏng
        borderTopColor: '#ddd',
        marginVertical: 5,
        width: '100%',
    },


    rateDetailContainer: {
        marginTop: 20,
        width: '100%',
        borderTopWidth: 1, // Viền mỏng
        borderTopColor: '#ddd', // Màu viền xám nhẹ

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
});

export default BookDetail;
