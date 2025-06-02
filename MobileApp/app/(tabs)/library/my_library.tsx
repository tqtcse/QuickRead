import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { updateCategory } from '@/src/services/bookApi';

const MyLibrary = () => {
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const AllBook = useSelector((state: RootState) => state.user.book);
    const token = useSelector((state: RootState) => state.user.token);

    const categoriesMarked = AllBook?.filter(book =>
        bookMarked?.some(bookMarked => bookMarked.bookId === book._id)
    );

    const categoryCount = categoriesMarked?.reduce((acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const top5Categories = Object.entries(categoryCount || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([category]) => category);

    const capitalized = top5Categories.map(cate =>
        cate.charAt(0).toUpperCase() + cate.slice(1).toLowerCase()
    );

    useEffect(() => {
        if (token) {
            updateCategory(token, capitalized);
        }
    }, []);

    const categories = [
        {
            name: 'Want to Read',
            subtitle: 'Books you want to explore next',
            path: '/library/want-to-read',
        },
        {
            name: 'Currently Reading',
            subtitle: 'Books you are reading now',
            path: '/library/currently-reading',
        },
        {
            name: 'Read',
            subtitle: 'Books you have finished',
            path: '/library/read',
        },
    ];

    return (
        <View style={styles.container}>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat.name}
                    style={styles.folder}
                    onPress={() =>
                        router.push({ pathname: "/library/[name]", params: { name: cat.name } })
                    }
                    activeOpacity={0.85}
                >
                    <View style={styles.iconWrapper}>
                        <FontAwesome name="book" size={26} color="#4f46e5" />
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.title}>{cat.name}</Text>
                        <Text style={styles.subtitle}>{cat.subtitle}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9fafc',
    },
    folder: {
        height: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e7ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
});

export default MyLibrary;
