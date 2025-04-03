import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { logout } from '../services/authApi';

interface SidebarProps {
    isVisible: boolean;
    onClose: () => void;
}

const handleLogout = async () => {
    const data = await logout();
    console.log(data)

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
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <Icon name="log-out-outline" size={24} color="black" />
                        <Text style={styles.menuItem}> Logout</Text>
                    </TouchableOpacity>

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
        backgroundColor: 'white',
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
        color: 'rgba(92, 90, 90, 0.94)',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 18,
        color: 'rgba(92, 90, 90, 0.94)',
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

export default Sidebar;
