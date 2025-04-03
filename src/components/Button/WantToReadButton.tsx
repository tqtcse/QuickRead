import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WantToReadButton = () => {
    const [wantToRead, setWantToRead] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.button, wantToRead ? styles.buttonActive : {}]}
            onPress={() => setWantToRead(!wantToRead)}
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
