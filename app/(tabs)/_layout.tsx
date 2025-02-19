// AppLayout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';  // expo-router giúp render trang con vào đây

const AppsLayout: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Thanh tiêu đề */}
      <View style={styles.topBar}>
        <Text style={styles.text}>Ứng dụng của tui</Text>
      </View>

      {/* Phần nội dung của các trang con */}
      <Slot /> {/* Render các trang con ở đây */}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default AppsLayout;
