import { deleteBookMarked, toggleBookMarked } from '@/src/store/user/userActions';
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Pressable,
    Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store';

const WantToReadButton = ({ isBookMarked, id, status }: { isBookMarked: boolean, id: string, status: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [wantToRead, setWantToRead] = useState(isBookMarked);
    const [showOptions, setShowOptions] = useState(false);
    const token = useSelector((state: RootState) => state.user.token);



    const mapStatusToOption = (status: string): 'want' | 'currently' | 'read' | null => {
        switch (status) {
            case 'want_to_read': return 'want';
            case 'reading': return 'currently';
            case 'read': return 'read';
            default: return null;
        }
    };

    const mapOptionToStatus = (option: 'want' | 'currently' | 'read'): string => {
        switch (option) {
            case 'want': return 'want_to_read';
            case 'currently': return 'reading';
            case 'read': return 'read';
        }
    };

    const [selectedOption, setSelectedOption] = useState<'want' | 'currently' | 'read' | null>(isBookMarked ? mapStatusToOption(status) : null);
    useEffect(() => {
        setWantToRead(isBookMarked);
        if (isBookMarked && !selectedOption) {

            setSelectedOption(mapStatusToOption(status));
        } else if (!isBookMarked && selectedOption) {
            setSelectedOption(null);
        }
    }, [isBookMarked, status]);

    const handleOptionSelect = (option: 'want' | 'currently' | 'read') => {
        setSelectedOption(option);
        setShowOptions(false);
        if (option && token) {
            console.log('option:', mapOptionToStatus(option));
            // dispatch(toggleBookMarked(id, option, token));
            dispatch(toggleBookMarked(id, mapOptionToStatus(option), token));
            setWantToRead(true);
        } else {
            setWantToRead(false);
        }
    };

    const getOptionLabel = (option: 'want' | 'currently' | 'read') => {
        switch (option) {
            case 'want': return 'Want to Read';
            case 'currently': return 'Currently Reading';
            case 'read': return 'Read';
            default: return 'Want to Read';
        }
    };

    const getButtonText = () => {
        if (selectedOption) {
            return `✓ ${getOptionLabel(selectedOption)}`;
        }
        return 'Want to Read';
    };

    const handleButtonPress = () => {
        if (selectedOption) {

            setSelectedOption(null);
            setWantToRead(false);
            if (token) {
                dispatch(deleteBookMarked(id, token));
            }
        } else {

            if (token) {
                dispatch(toggleBookMarked(id, 'want_to_read', token));
            }
            setWantToRead(true);
            setSelectedOption('want');
        }
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[styles.button, selectedOption ? styles.buttonActive : {}]}
                onPress={handleButtonPress}
            >
                <Text style={styles.buttonText}>
                    {getButtonText()}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
                <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={showOptions}
                animationType="fade"
                onRequestClose={() => setShowOptions(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowOptions(false)}
                >
                    <View style={styles.dropdown}>
                        {(['want', 'currently', 'read'] as const).map((option) => {
                            const isSelected = option === selectedOption;
                            return (
                                <Pressable
                                    key={option}
                                    onPress={() => handleOptionSelect(option)}
                                    style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                                >
                                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                        {isSelected ? '✓ ' : ''}{getOptionLabel(option)}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonActive: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    dropdownIcon: {
        fontSize: 16,
        padding: 6,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 999,
        color: '#333',
        overflow: 'hidden',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: '65%',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    optionItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    optionItemSelected: {
        backgroundColor: '#E6F9EC',
        borderRadius: 10,
    },
    optionText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    optionTextSelected: {
        color: '#34C759',
        fontWeight: '700',
    },
});

export default WantToReadButton;