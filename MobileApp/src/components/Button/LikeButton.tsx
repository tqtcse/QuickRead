// LikeButton.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, unlikeComment } from '@/src/store/user/userActions';
import { RootState } from '@/src/store';
import { AppDispatch } from '@/src/store';

const LikeButton = ({ initialLikes, commentId }: { initialLikes: number, commentId: string }) => {

    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.user.token);
    const likedComments = useSelector((state: RootState) => state.user.likedComments || []);


    useEffect(() => {
        if (Array.isArray(likedComments)) {
            const isLiked = likedComments.some((comment) => comment._id === commentId);
            setLiked(isLiked);

        } else {
            setLiked(false);
        }
        setLikes(initialLikes)
    }, [likedComments, commentId]);


    const handlePress = () => {

        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
            if (token) {
                dispatch(unlikeComment(commentId, token));
            }
        } else {
            setLikes(likes + 1);
            setLiked(true);
            if (token) {
                dispatch(likeComment(commentId, token));
            }
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.text}><Icon
                name="thumbs-up"
                size={18}
                color={liked ? '#00BFFF' : '#A9A9A9'}
            /> {likes}


            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 5,
        marginTop: 5,
    },
    text: {
        fontSize: 16,
    },
});

export default LikeButton;
