import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Profile Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    text: {
        color: '#FFF',
        fontSize: 18,
    },
});

export default Profile;
