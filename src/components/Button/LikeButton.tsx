// LikeButton.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeButton = ({ initialLikes = 0 }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const handlePress = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.text}><Icon
                name="thumbs-up"
                size={18}
                color={liked ? '#00BFFF' : '#A9A9A9'} // màu sáng khi like, màu xám khi không
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
