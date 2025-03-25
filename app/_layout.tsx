// import React, { useRef } from 'react';
// import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

// interface SidebarProps {
//     isVisible: boolean;
//     onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
//     const slideAnim = useRef(new Animated.Value(300)).current; // Vị trí ban đầu bên phải ngoài màn hình

//     React.useEffect(() => {
//         Animated.timing(slideAnim, {
//             toValue: isVisible ? 0 : 300, // Dịch chuyển vào nếu mở, ra ngoài nếu đóng
//             duration: 300,
//             useNativeDriver: true,
//         }).start();
//     }, [isVisible]);

//     return (
//         <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
//             <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                 <Text style={styles.closeText}>✕</Text>
//             </TouchableOpacity>
//             <Text style={styles.menuItem}>Profile</Text>
//             <Text style={styles.menuItem}>Settings</Text>
//             <Text style={styles.menuItem}>Notifications</Text>
//             <Text style={styles.menuItem}>Logout</Text>
//         </Animated.View>
//     );
// };

// const styles = StyleSheet.create({
//     sidebar: {
//         position: 'absolute',
//         right: 0,
//         top: 0,
//         width: 250,
//         height: '100%',
//         backgroundColor: '#333',
//         padding: 20,
//         justifyContent: 'center',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 20,
//         right: 20,
//     },
//     closeText: {
//         fontSize: 20,
//         color: '#fff',
//     },
//     menuItem: {
//         fontSize: 18,
//         color: '#fff',
//         marginVertical: 10,
//     },
// });

// export default Sidebar;
