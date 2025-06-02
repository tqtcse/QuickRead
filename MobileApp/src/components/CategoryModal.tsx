import { router } from "expo-router";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

type CategoryModalProps = {
    data: string[];
    visible: boolean;
    onClose: () => void;
};

const chunkArray = (arr: string[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

const CategoryModal = ({ data, visible, onClose }: CategoryModalProps) => {

    const rows = chunkArray(data, 2);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.dropdown}>
                    {rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((item) => (
                                <TouchableOpacity key={item} style={styles.itemBox}>
                                    <Text style={styles.itemText}
                                        onPress={() => router.push({
                                            pathname: "/home/category/[name]",
                                            params: { name: item.toLowerCase() },
                                        })}
                                    >
                                        {item}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    itemBox: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});

export default CategoryModal;
