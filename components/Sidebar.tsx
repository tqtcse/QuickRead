import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

interface SidebarProps {
    isVisible: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
    const slideAnim = useRef(new Animated.Value(-250)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: isVisible ? 0 : -250,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: isVisible ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isVisible]);

    return (
        isVisible && (
            <View style={styles.overlayContainer}>
                {/* Overlay nền mờ */}
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
                </Animated.View>

                {/* Sidebar */}
                <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.menuItem}>🏠 Home</Text>
                    <Text style={styles.menuItem}>🔍 Search</Text>
                    <Text style={styles.menuItem}>📚 My Library</Text>
                    <Text style={styles.menuItem}>👤 Profile</Text>
                </Animated.View>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    },
    overlayTouchable: {
        flex: 1, // Để bấm vào là đóng sidebar
    },
    sidebar: {
        position: 'absolute',
        left: 0, // Đặt sidebar ở bên trái
        top: 0,
        width: 250,
        height: '100%',
        backgroundColor: '#333',
        padding: 20,
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    closeText: {
        fontSize: 20,
        color: '#fff',
    },
    menuItem: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 10,
    },
});

export default Sidebar;
