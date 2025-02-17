import React from 'react';
import { View, Text } from 'react-native'
import styles from '../styles/style'

const TopBar: React.FC = () => {
    return (
        <View style={styles.topBar}>
            <Text style={styles.text}>Ứng dụng của tui</Text>
        </View>
    );
};

export default TopBar;