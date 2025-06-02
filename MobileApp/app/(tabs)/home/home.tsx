import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SectionList,
    RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import BookItem from '../../../src/components/BookItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/src/store';
import { getAllBook, getBookMarked, setHasFetchedAction, getUserCategory, getCategory } from '@/src/store/user/userActions';
import type Book from '@/app/@type/Book';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CategoryModal from '@/src/components/CategoryModal';



const HomeScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.user.token);
    const bookMarked = useSelector((state: RootState) => state.user.bookMarked);
    const AllBook = useSelector((state: RootState) => state.user.book);
    const router = useRouter();

    const [booksSectionData, setBooksSectionData] = useState<{ title: string, data: Book[] }[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const hasFetched = useSelector((state: RootState) => state.user.hasFetched)
    const userCategory = useSelector((state: RootState) => state.user.userCategory)
    const category = useSelector((state: RootState) => state.user.category)

    const [categoryData, setCategoryData] = useState<string[]>([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY <= 0) {
            setIsAtTop(true);
        } else {
            setIsAtTop(false);
        }

    }
    const fetchUserData = async () => {
        if (!token) return;

        try {
            dispatch(setHasFetchedAction(true));
            dispatch(getAllBook(token));
            dispatch(getBookMarked(token));
            dispatch(getUserCategory(token));
            dispatch(getCategory(token));

        } catch (error) {
            console.error("Error fetching user category:", error);

        }
    };

    useEffect(() => {
        if (!userCategory || userCategory.length === 0 || AllBook.length === 0) return;

        const categoryData = category.map((item: any) => item.name);
        setCategoryData(categoryData)

        const grouped = AllBook.reduce((acc: Record<string, Book[]>, book: Book) => {
            if (!acc[book.category]) acc[book.category] = [];
            acc[book.category].push(book);
            return acc;
        }, {} as Record<string, Book[]>);

        const sectionData = Object.entries(grouped).map(([category, books]) => {
            const topBooks = books
                .sort((a, b) => {
                    if (b.rating !== a.rating) return b.rating - a.rating;
                    return b.rating_count - a.rating_count;
                })
                .slice(0, 3);

            const formattedCategory = category
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            return {
                title: formattedCategory,
                data: topBooks,
            };
        });

        let sortedSectionData = sectionData;
        sortedSectionData = [...sectionData].sort((a, b) => {
            const indexA = userCategory.findIndex(c => c.name.toLowerCase() === a.title.toLowerCase());
            const indexB = userCategory.findIndex(c => c.name.toLowerCase() === b.title.toLowerCase());

            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

        setBooksSectionData(sortedSectionData);
    }, [userCategory, AllBook]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchUserData();
        setRefreshing(false);
    }, [token]);

    useEffect(() => {
        if (!token || hasFetched) return;
        fetchUserData();
    }, [token]);


    return (
        <View style={styles.container}>
            {categoryData.length > 0 && <CategoryModal data={categoryData} visible={showCategoryModal} onClose={() => setShowCategoryModal(false)} />}

            <View style={styles.headerContainer}>
                <Text style={styles.header} >Recommended</Text>
                <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
                    <FontAwesomeIcon icon={faBars} size={20} color="black" />
                </TouchableOpacity>
            </View>


            <SectionList
                onScroll={handleScroll}
                scrollEventThrottle={16}
                sections={booksSectionData}
                keyExtractor={(item) => item._id}
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionHeader}>{title}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: "/home/category/[name]",
                                    params: { name: title.toLowerCase() },
                                })
                            }
                        >
                            <Text style={styles.moreIcon}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderItem={({ item }) => {
                    const status = bookMarked?.find(book => book.bookId === item._id)?.status;

                    return (
                        <BookItem
                            item={item}
                            status={status || ''}
                            isBookMarked={!!status}
                            onPress={() =>
                                router.push({
                                    pathname: '/home/book/[id]',
                                    params: { id: item._id },
                                })
                            }
                        />
                    );
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 1,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 5,
    },
    moreIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
});

export default HomeScreen;
