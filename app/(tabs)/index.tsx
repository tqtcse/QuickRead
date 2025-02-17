import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/style'
import TopBar from '@/components/TopBar';

const categories = [
  { name: 'Công nghệ', screen: '/technology' },
  { name: 'Giải trí', screen: '/entertainment' },
  { name: 'Thể thao', screen: '/sports' },
  { name: 'Âm nhạc', screen: '/music' },
] as const;

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <View>
      <TopBar />  {/* Sử dụng TopBar ở đây */}

      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(category.screen)}
        >
          <Text>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
