import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import WantToReadButton from "@/src/components/Button/WantToReadButton";
// Danh sách sách giả lập (có thể thay bằng API)

interface Comment {
    user: string;  // Người đánh giá
    text: string;  // Nội dung bình luận
    date: string;
    like: string;
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
            1: { count: 1, comments: [{ user: "John", text: "Not good", date: "2025-04-02T15:00:00Z", like: "100", rating: 1 }] },
            2: { count: 3, comments: [{ user: "Alice", text: "Could be better", date: "2025-04-03T10:00:00Z", like: "100", rating: 2 }] },
            3: { count: 1, comments: [{ user: "Bob", text: "Average", date: "2025-04-01T08:30:00Z", like: "100", rating: 3 }] },
            4: { count: 1, comments: [{ user: "Charlie", text: "Liked it", date: "2025-04-01T08:30:00Z", like: "100", rating: 4 }] },
            5: { count: 5, comments: [{ user: "David", text: "Amazing book!", date: "2025-04-01T08:30:00Z", like: "100", rating: 5 }, { user: "Eva", text: "Loved it! Dòng nước đưa nó đến một vùng đất mới, nơi nó lắng xuống một con sông hiền hòa. Ở đó, nó gặp những hạt cát khác, những hòn sỏi lấp lánh, n ", date: "2025-04-03T18:00:00Z", like: "100", rating: 5 }] }
        }
    },
    // {
    //     id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Tiểu thuyết', cover: 'https://m.media-amazon.com/images/I/416toFaYhUL._SL500_.jpg',
    //     rating: 4
    // },
    // { id: '3', title: '1984', author: 'George Orwell', category: 'Khoa học viễn tưởng', cover: 'https://source.unsplash.com/100x150/?dystopian', rating: 4 },
    // { id: '4', title: 'Moby-Dick', author: 'Herman Melville', category: 'Kinh điển', cover: 'https://source.unsplash.com/100x150/?ocean', rating: 5 },
    // { id: '5', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Khoa học', cover: 'https://source.unsplash.com/100x150/?history', rating: 3 },
    // { id: '6', title: 'The Lean Startup', author: 'Eric Ries', category: 'Kinh doanh', cover: 'https://source.unsplash.com/100x150/?business', rating: 3 },
];

const BookDetail: React.FC = () => {

    const [userRating, setUserRating] = useState<number>(0);
    const { id } = useLocalSearchParams(); // Lấy ID từ URL
    // const book = books.find((b) => b.id === id);

    // if (!book) {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.errorText}>Không tìm thấy sách! 📚</Text>
    //         </View>
    //     );
    // }

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

        // Lặp qua tất cả các rate (1, 2, 3, 4, 5)
        for (const rate in rateDetail) {
            if (rateDetail[rate]?.comments) {
                allComments = [...allComments, ...rateDetail[rate].comments];
            }
        }

        // Sắp xếp comment theo thời gian (timestamp), từ mới nhất đến cũ nhất
        allComments.sort((a, b) => convertToTimestamp(b.date) - convertToTimestamp(a.date));
        return allComments;
    };
    // Tìm sách theo ID


    // if (!book) {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.errorText}>Không tìm thấy sách! 📚</Text>
    //         </View>
    //     );
    // }
    const book = books[0]; // lấy sách đầu tiên trong danh sách
    const sortedComments = getAllComments(book.rateDetail);

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
                <Text style={styles.description}>{book.description}</Text>

                <View style={styles.rateDetailContainer}>
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
                </View >
                <View style={styles.parentCommentContainer} >
                    <FlatList
                        data={sortedComments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View style={styles.commentContainer}>
                                <Image
                                    source={{ uri: item.avatar || 'data:image/png;base64,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' }}
                                    style={styles.avatar}
                                />
                                <View >
                                    <Text ><Text style={styles.commentUser}>{item.user}</Text> rated it {Array.from({ length: 5 }, (_, index) => (
                                        <Text key={index} style={styles.commentStar} >

                                            {item.rating ? (index < item.rating ? '★' : '☆') : '☆'}
                                        </Text>
                                    ))}</Text>
                                    <Text style={styles.commentTime}>
                                        {new Date(item.date).toLocaleString()}
                                    </Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ flexShrink: 1, flexWrap: 'wrap', width: '100%' }}>
                                            {item.text}
                                        </Text>
                                    </View>
                                </View>


                            </View>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20, // Làm tròn avatar
        marginRight: 10, // Cách nội dung comment
        color: 'black'
    },
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
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',

        marginBottom: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    commentUser: {
        fontWeight: 'bold',
        // color: 
    },
    commentText: {
        marginVertical: 5,
    },
    commentTime: {
        fontSize: 11,
        color: '#666',
    },
    rateDetailContainer: {
        marginTop: 20,
        width: '100%',
        borderTopWidth: 1, // Viền mỏng
        borderTopColor: '#ddd', // Màu viền xám nhẹ
        // shadowColor: '#000', // Màu bóng
        // shadowOffset: { width: 0, height: -1 }, // Bóng ở phía trên
        // shadowOpacity: 0.1, // Độ mờ của bóng
        // shadowRadius: 3, // Độ lan của bóng
        // elevation: 3, // Chỉ dành cho Android để hiển thị bóng
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
