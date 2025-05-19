import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

type ExpandCommentProps = {
    id: string;
}

const ExpandComment: React.FC<ExpandCommentProps> = ({ id }) => {
    const router = useRouter();

    const handleBack = () => {
        router.push({ pathname: "/home/book/reviewDetail/[id]", params: { id: id, } })
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleBack}>
            {/* <Icon name="arrow-left" size={24} color="#666" /> */}
            {/* <button>sa</button> */}
            <Text style={{ fontSize: 18 }}> More community ratings and reviews</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        width: '100%',
        alignItems: 'center'

    },
});

export default ExpandComment;