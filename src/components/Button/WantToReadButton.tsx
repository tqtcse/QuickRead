import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WantToReadButton = ({ isBookMarked }: { isBookMarked: boolean }) => {
    const [wantToRead, setWantToRead] = useState(isBookMarked);

    // Cập nhật state nếu prop thay đổi
    useEffect(() => {
        setWantToRead(isBookMarked);
    }, [isBookMarked]);

    const handlePress = () => {
        setWantToRead((prev) => !prev);
        // Bạn có thể gọi API hoặc dispatch Redux ở đây nếu muốn cập nhật server
    };

    return (
        <TouchableOpacity
            style={[styles.button, wantToRead ? styles.buttonActive : {}]}
            onPress={handlePress}
        >
            <Text style={styles.buttonText}>
                {wantToRead ? 'Added' : 'Want to Read'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default WantToReadButton;
