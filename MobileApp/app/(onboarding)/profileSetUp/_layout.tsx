import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Slot, usePathname } from 'expo-router';
import BackButton from '@/src/components/Button/BackButton';
import CustomToast from '@/src/components/CustomToast';
import Toast, { ToastConfigParams } from 'react-native-toast-message';
const AppsLayout: React.FC = () => {
    const pathname = usePathname();
    const { width } = useWindowDimensions();

    const steps = [
        '/profileSetUp/genderScreen',
        '/profileSetUp/bookGenreScreen',
        '/profileSetUp/completedProfile',
        '/profileSetUp/createAccount',

    ];
    const toastConfig = {
        success: (props: ToastConfigParams<any>) => {
            const { text1, text2, } = props;
            return (
                <CustomToast
                    text1={text1 ?? ''}
                    text2={text2 ?? ''}
                    // nếu CustomToast cần visibilityTime thì truyền props.visibilityTime hoặc mặc định
                    visibilityTime={(props as any).visibilityTime ?? 3000}
                />
            );
        },
    };

    const currentStepIndex = steps.findIndex((step) => pathname.startsWith(step));
    const progress = currentStepIndex >= 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;


    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <BackButton />
            </View>

            {/* Progress Bar */}
            {currentStepIndex >= 0 && (
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
            )}

            {/* Content */}
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
