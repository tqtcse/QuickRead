import { FlatList } from "react-native"
import type Book from "@/app/@type/Book";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { useRouter } from "expo-router";

type HorizontalListProps = {
    data: Book[];
    pathname: '/home/book/[id]'
}

const HorizontalList = ({ data, pathname }: HorizontalListProps) => {
    const router = useRouter();
    const styles = StyleSheet.create({
        bookList: {
            paddingVertical: 12,
            paddingHorizontal: 4,
        },
        bookItem: {
            width: 160,
            marginRight: 12,
            padding: 12,
            borderRadius: 12,
            backgroundColor: '#fff',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        bookCover: {
            width: 120,
            height: 180,
            borderRadius: 10,
            marginBottom: 8,
            borderWidth: 1,
            borderColor: '#eee',
        },
        bookTitle: {
            fontSize: 14,
            fontWeight: '600',
            color: '#2c3e50',
            textAlign: 'center',
            marginBottom: 4,
            maxWidth: 140,
        },
        bookAuthor: {
            fontSize: 12,
            color: '#7f8c8d',
            textAlign: 'center',
            marginBottom: 18,
        },
        bookRating: {
            fontSize: 12,
            color: '#e67e22',
            fontWeight: '600',
            position: 'absolute',
            bottom: 8,
        },
        bookRatingCount: {
            fontSize: 12,
            color: '#7f8c8d',
            fontWeight: '600',
            position: 'absolute',
            bottom: 8,
        },
    })
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.bookList}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => router.push({ pathname: pathname, params: { id: item._id } })}
                    style={styles.bookItem}
                    activeOpacity={0.8}
                >
                    <Image
                        source={{ uri: item.cover }}
                        style={styles.bookCover}
                        resizeMode="cover"
                    />
                    <Text numberOfLines={2} style={styles.bookTitle}>{item.title}</Text>
                    <Text style={styles.bookAuthor}>{item.author}</Text>
                    <Text style={styles.bookRatingCount}>{item.rating_count} rating</Text>
                </TouchableOpacity>
            )}
        />


    )

}
export default HorizontalList;