import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


const books = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://source.unsplash.com/100x150/?book' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://source.unsplash.com/100x150/?novel' },
  { id: '3', title: '1984', author: 'George Orwell', cover: 'https://source.unsplash.com/100x150/?dystopian' },
  { id: '4', title: 'Moby-Dick', author: 'Herman Melville', cover: 'https://source.unsplash.com/100x150/?ocean' },
  { id: '5', title: 'Moby-Dick', author: 'Herman Melville', cover: 'https://source.unsplash.com/100x150/?ocean' },
  { id: '6', title: 'Moby-Dick', author: 'Herman Melville', cover: 'https://source.unsplash.com/100x150/?ocean' },
];

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Sách đề xuất</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookItem} onPress={() => router.push(`/book/${item.id}`)}>
            <Image source={{ uri: item.cover }} style={styles.bookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>by {item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 5,
  },
  bookInfo: {
    marginLeft: 15,
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;
