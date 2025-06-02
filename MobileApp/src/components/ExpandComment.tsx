import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

type ExpandCommentProps = {
    id: string;
}

const ExpandComment: React.FC<ExpandCommentProps> = ({ id }) => {
    const router = useRouter();

    const handleBack = () => {
        router.push({ pathname: "/home/book/reviewDetail/[id]", params: { id } });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleBack} activeOpacity={0.7}>
            <View style={styles.content}>
                <Icon name="message-circle" size={20} color="#007AFF" style={styles.icon} />
                <Text style={styles.text}>More community ratings and reviews</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#e6f0ff',
        borderRadius: 10,
        shadowColor: '#007AFF',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,

        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
});

export default ExpandComment;
