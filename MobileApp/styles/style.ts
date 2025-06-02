// styles/globalStyles.ts
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 5,
    },
    topBar: {
        backgroundColor: '#6200EE',
        padding: 20,
        alignItems: 'center',
    },
});

export default globalStyles;
