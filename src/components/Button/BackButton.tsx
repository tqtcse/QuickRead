import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

const BackButton: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back(); // Quay lại trang trước đó
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Icon name="arrow-left" size={24} color="#666" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 0, // Vùng chạm lớn hơn một chút để dễ bấm

    },
});

export default BackButton;