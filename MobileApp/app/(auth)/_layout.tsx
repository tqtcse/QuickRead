import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import CustomToast from '@/src/components/CustomToast';
import Toast, { ToastConfigParams } from 'react-native-toast-message';
const AppsLayout: React.FC = () => {

    const toastConfig = {
        success: (props: ToastConfigParams<any>) => {
            const { text1, text2, } = props;
            return (
                <CustomToast
                    text1={text1 ?? ''}
                    text2={text2 ?? ''}
                    visibilityTime={(props as any).visibilityTime ?? 3000}
                />
            );
        },
    };



    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Slot />
            </View>
            <Toast />
        </View>
    );
};

export default AppsLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        elevation: 3,
    },
    progressBarContainer: {
        height: 6,
        width: '90%',
        backgroundColor: '#eee',
        alignSelf: 'center',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 3,
    },
    content: {
        flex: 1,
    },
});
