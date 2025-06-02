import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Slot, Link, usePathname } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon
import BackButton from '@/src/components/Button/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppsLayout: React.FC = () => {
  const pathname = usePathname();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (

    <View style={styles.container}>
      <SafeAreaView edges={['top']} >
        <View style={styles.topBar}>
          {pathname === '/' || pathname === '/home/home' || pathname === '/search/search' || pathname === '/library/my_library' ||
            pathname === '/profile/profile' || pathname === '/(auth)/login' ? (
            <TouchableOpacity style={styles.iconButton} onPress={() => setSidebarVisible(true)}>
              {/* <Icon name="menu" size={28} color="rgba(92, 90, 90, 0.94)" /> */}

            </TouchableOpacity>
          ) : (
            <BackButton />
          )}


          <Text style={styles.title}>QuickRead</Text>



          {/* <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Notification pressed")}>
          <Icon name="notifications" size={28} color="rgba(92, 90, 90, 0.94)" />
        </TouchableOpacity> */}
        </View>
      </SafeAreaView>


      <View style={styles.content}>
        <Slot />
      </View>
      <View style={styles.bottomBar}>
        <Link href={"/"} >
          <View style={styles.iconContainer}>
            <Icon name="home" size={24} color={pathname === "/" || pathname.startsWith("/home/")
              ? "#rgba(58, 207, 252, 0.94)"
              : "#rgba(92, 90, 90, 0.94)"
            } />
            <Text style={[styles.text, (pathname.startsWith("/home/") || pathname === "/") && styles.activeText]}>Home</Text>
          </View>
        </Link>

        <Link href={"/search/search"} >
          <View style={styles.iconContainer}>
            <Icon name="search" size={24} color={pathname.startsWith("/search") ? "#rgba(58, 207, 252, 0.94)" : "#rgba(92, 90, 90, 0.94)"} />
            <Text style={[styles.text, pathname.startsWith("/search/") && styles.activeText]}>Search</Text>
          </View>
        </Link>

        <Link href={"/library/my_library"} >
          <View style={styles.iconContainer}>
            <Icon name="library-books" size={24} color={pathname.startsWith("/library/") ? "#rgba(58, 207, 252, 0.94)" : "#rgba(92, 90, 90, 0.94)"} />
            <Text style={[styles.text, pathname.startsWith("/library/") && styles.activeText]}>My Library</Text>
          </View>
        </Link>

        <Link href={"/profile/profile"} >
          <View style={styles.iconContainer}>
            <Icon name="person" size={24} color={pathname.startsWith("/profile/") ? "#rgba(58, 207, 252, 0.94)" : "#rgba(92, 90, 90, 0.94)"} />
            <Text style={[styles.text, pathname.startsWith("/profile/") && styles.activeText]}>Profile</Text>
          </View>
        </Link>

      </View>
      {/* {isSidebarVisible && <Sidebar isVisible={isSidebarVisible} onClose={() => setSidebarVisible(false)} />} */}
    </View >




  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: -1 }, // Bóng ở phía trên
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 3, // Độ lan của bóng
    elevation: 3,
    borderBottomWidth: 1, // Viền mỏng
    borderBottomColor: '#ddd',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 1, // Viền mỏng
    borderTopColor: '#ddd', // Màu viền xám nhẹ
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: -1 }, // Bóng ở phía trên
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 3, // Độ lan của bóng
    elevation: 3, // Chỉ dành cho Android để hiển thị bóng

  },
  iconButton: {
    padding: 5,
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    // position: 'absolute',
    // right: '36%'
  },
  link: {
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: '#rgba(92, 90, 90, 0.94)',
    fontSize: 14,
    marginTop: 5,
  },
  acctiveLink: {
    color: '#rgba(58, 207, 252, 0.94)',
  },
  activeText: {
    color: '#rgba(58, 207, 252, 0.94)',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textShadowColor: 'rgba(151, 204, 231, 0.94)',
    textShadowRadius: 0.5
  },
});

export default AppsLayout;
