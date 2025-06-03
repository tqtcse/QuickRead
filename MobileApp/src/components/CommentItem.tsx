import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LikeButton from './Button/LikeButton';
import ExpandableText from './ExpandText';
import { API_URL } from '@/src/config/env';



interface CommentItemProps {
    item: {
        _id: string;
        book_id: string;
        text: string;
        rating: number;
        updatedAt: string;
        like_counts: number;
        user_id: {
            username: string;
            avatar_url: string;
        };
    }
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => {

    return (
        <View style={styles.commentContainer}>
            <View style={styles.headerComment}>
                {/* <Image source={{ uri: `${API_URL}${item.user_id.avatar_url}` }} style={styles.avatar} /> */}
                <Image
                                    source={
                                        item.user_id.avatar_url
                                            ? { uri: `${API_URL}${item.user_id.avatar_url}` }
                                            : require('@/assets/images/user.jpg')
                                    }
                                    style={styles.avatar}
                                />
                <View style={{ flex: 1 }}>
                    <Text>
                        <Text style={styles.commentUser}>{item.user_id.username}</Text> rated it{' '}
                        {Array.from({ length: 5 }, (_, index) => (
                            <Text key={index} style={styles.commentStar}>
                                {index < item.rating ? '★' : '☆'}
                            </Text>
                        ))}
                    </Text>
                    <Text style={styles.commentTime}>
                        {new Date(item.updatedAt).toLocaleString()}
                    </Text>
                    <ExpandableText text={item.text} numberOfLines={4} />
                </View>
            </View>
            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                <LikeButton initialLikes={item.like_counts} commentId={item._id} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerComment: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 12,
    },
    commentUser: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#333',
    },
    commentStar: {
        fontSize: 16,
        color: '#FFD700',
        marginRight: 1,
    },
    commentTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    commentText: {
        fontSize: 14,
        color: '#444',
        marginTop: 6,
    },
});
export default CommentItem;