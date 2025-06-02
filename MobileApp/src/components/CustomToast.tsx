import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

interface CustomToastProps {
    text1: string;
    text2?: string;
    visibilityTime: number;
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, visibilityTime }) => {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Reset progress về 0 mỗi lần toast mới mount
        progress.setValue(0);

        // Chạy animation tăng width từ 0% đến 100%
        Animated.timing(progress, {
            toValue: 1,
            duration: visibilityTime,
            useNativeDriver: false,
        }).start(() => {
            // Khi animation kết thúc, ẩn toast
            setTimeout(() => {
                Toast.hide();
            }, 200); // trì hoãn 1 chút để animation nhìn mượt
        });
    }, [progress, visibilityTime]);

    const widthInterpolate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.toastContainer}>
            <Text style={styles.text1}>{text1}</Text>
            {text2 ? <Text style={styles.text2}>{text2}</Text> : null}

            <View style={styles.progressBarBackground}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: widthInterpolate,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#e0ffe0',
        borderRadius: 8,
        minWidth: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    progressBarBackground: {
        height: 4,
        width: '100%',
        backgroundColor: '#c8f2c8',
        borderRadius: 2,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressBar: {
        height: 4,
        backgroundColor: 'green',
        borderRadius: 2,
    },
    text1: {
        fontWeight: 'bold',
        color: '#06470c',
    },
    text2: {
        color: '#06470c',
        marginTop: 4,
    },
});

export default CustomToast;
