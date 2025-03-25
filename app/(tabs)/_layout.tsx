import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slot, Link, usePathname } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon
import Sidebar from '../../components/Sidebar'


const AppsLayout: React.FC = () => {
  const pathname = usePathname();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setSidebarVisible(true)}>
          <Icon name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>QuickRead</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Notification pressed")}>
          <Icon name="notifications" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Slot />
      </View>
      <View style={styles.bottomBar}>
        <Link href={"/"} >
          <View style={styles.iconContainer}>
            <Icon name="home" size={24} color={pathname === "/" ? "#FFD700" : "#FFFFFF"} />
            <Text style={[styles.text, pathname === "/" && styles.activeText]}>Home</Text>
          </View>
        </Link>
        <Link href={"/search"} >
          <View style={styles.iconContainer}>
            <Icon name="search" size={24} color={pathname === "/search" ? "#FFD700" : "#FFFFFF"} />
            <Text style={[styles.text, pathname === "/search" && styles.activeText]}>Search</Text>
          </View>
        </Link>
        <Link href={"/my_library"} >
          <View style={styles.iconContainer}>
            <Icon name="library-books" size={24} color={pathname === "/my_library" ? "#FFD700" : "#FFFFFF"} />
            <Text style={[styles.text, pathname === "/my_library" && styles.activeText]}>My Library</Text>
          </View>
        </Link>
        <Link href={"/profile"} >
          <View style={styles.iconContainer}>
            <Icon name="person" size={24} color={pathname === "/profile" ? "#FFD700" : "#FFFFFF"} />
            <Text style={[styles.text, pathname === "/profile" && styles.activeText]}>Profile</Text>
          </View>
        </Link>
      </View>
      {isSidebarVisible && <Sidebar isVisible={isSidebarVisible} onClose={() => setSidebarVisible(false)} />}
    </View>


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
    backgroundColor: '#333333',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333333',
    paddingVertical: 15,
  },
  iconButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  acctiveLink: {
    color: '#FFD700',
  },
  activeText: {
    color: '#FFD700',
  },
});

export default AppsLayout;
