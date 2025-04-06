import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import CommentItem from '@/src/components/CommentItem';
import BackButton from '@/src/components/Button/BackButton';

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

const books: Book[] = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Tiểu thuyết',
        cover: 'https://images.squarespace-cdn.com/content/v1/624da83e75ca872f189ffa42/1660938091838-OPRIN3NA7SEHYSW7VSDH/image001.jpg',
        rating: 5,
        description: `Ở một bờ biển xa xôi, nơi sóng vỗ miên man suốt ngày đêm, có một hạt cát nhỏ bé nằm lẫn trong hàng triệu, hàng tỷ hạt cát khác. Nó chẳng có gì đặc biệt – chỉ là một hạt cát nhỏ, lặng lẽ chịu đựng sự xô đẩy của sóng biển và gió trời.

Nhưng rồi một ngày, một cơn bão mạnh quét qua bãi biển, những con sóng hung dữ cuốn phăng mọi thứ trên đường đi của nó. Hạt cát bị cuốn vào dòng nước xiết, trôi dạt đi thật xa, vượt qua bãi biển mà nó đã quen thuộc suốt bao năm trời. Nó sợ hãi, nhưng cũng háo hức – lần đầu tiên trong đời, nó được rời khỏi chốn cũ để khám phá thế giới bao la ngoài kia.

Dòng nước đưa nó đến một vùng đất mới, nơi nó lắng xuống một con sông hiền hòa. Ở đó, nó gặp những hạt cát khác, những hòn sỏi lấp lánh, những chú cá nhỏ bơi lội tung tăng. Con sông chở nó đi qua những cánh rừng rậm rạp, những thảo nguyên bát ngát, qua những ngôi làng nhỏ bé và những cây cầu cổ kính. Nó chứng kiến cuộc sống muôn màu muôn vẻ của con người, của thiên nhiên, của cả những sinh vật nhỏ bé mà trước đây nó chưa từng biết đến.`,
        ratingAmount: 11,
        reviewAmount: 2,
        rateDetail: {
            1: { count: 1, comments: [{ user: "John", text: "Not good", date: "2025-04-02T15:00:00Z", like: 100, rating: 1 }] },
            2: { count: 3, comments: [{ user: "Alice", text: "Could be better", date: "2025-04-03T10:00:00Z", like: 100, rating: 2 }] },
            3: { count: 1, comments: [{ user: "Bob", text: "Average", date: "2025-04-01T08:30:00Z", like: 100, rating: 3 }] },
            4: { count: 1, comments: [{ user: "Charlie", text: "Liked it", date: "2025-04-01T08:30:00Z", like: 100, rating: 4 }] },
            5: {
                count: 5, comments: [
                    { user: "David", text: "Amazing book!", date: "2025-04-01T08:30:00Z", like: 100, rating: 5 },
                    { user: "Eva", text: "Loved it! Dòng nước đưa nó đến một vùng đất mới, nơi nó lắng xuống một con sông hiền hòa. Ở đó, nó gặp những hạt cát khác, những hòn sỏi lấp lánh.", date: "2025-04-03T18:00:00Z", like: 9, rating: 5 }
                ]
            }
        }
    },
];

const ReviewDetail: React.FC = () => {
    const book = books[0];
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const calculatePercentage = (count: number) => {
        const totalReviews = book.ratingAmount || 1;
        return (count / totalReviews) * 100;
    };

    const convertToTimestamp = (date: string | Date): number => {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) {
            throw new Error("Ngày không hợp lệ");
        }
        return dateObj.getTime();
    };

    const getAllComments = (rateDetail: any) => {
        let allComments: any[] = [];
        if (selectedRating) {
            const selectedComments = rateDetail[selectedRating]?.comments || [];
            allComments = [...selectedComments];
        } else {
            for (const rate in rateDetail) {
                if (rateDetail[rate]?.comments) {
                    allComments = [...allComments, ...rateDetail[rate].comments];
                }
            }
        }
        allComments.sort((a, b) => convertToTimestamp(b.date) - convertToTimestamp(a.date));
        return allComments;
    };

    const sortedComments = getAllComments(book.rateDetail);



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                {/* <View style={styles.buttonContainer}>
                    <BackButton />
                </View> */}
                <View style={styles.rateDetailContainer}>
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Community Reviews</Text>
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = calculatePercentage(book.rateDetail[rating]?.count || 0);
                        const isSelected = selectedRating === rating;
                        return (
                            <TouchableOpacity
                                key={rating}
                                onPress={() => setSelectedRating(selectedRating === rating ? null : rating)}
                            >
                                <View style={[styles.rateRow, { opacity: selectedRating === null || isSelected ? 1 : 0.5 }]}>
                                    <Text style={styles.starText}>{rating} Star</Text>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.bar, { width: `${percentage}%` }]} />
                                    </View>
                                    <Text style={styles.rateCount}>{book.rateDetail[rating]?.count || 0} reviews</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
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