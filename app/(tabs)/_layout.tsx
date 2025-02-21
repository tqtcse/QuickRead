import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slot, Link, usePathname } from 'expo-router';

const AppsLayout: React.FC = () => {
  const pathname = usePathname()

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href={"/setting"} style={[styles.link, pathname === "/setting" && styles.acctiveLink]}>Setting</Link>
        <Link href={"/notification"} style={[styles.link, pathname === "/notification" && styles.acctiveLink]}>Notification</Link>
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
      <View style={styles.bottomBar}>

        <Link href={"/"} style={[styles.link, pathname === "/" && styles.acctiveLink]}>Home</Link>
        <Link href={"/search"} style={[styles.link, pathname === "/search" && styles.acctiveLink]}> Search  </Link >
        <Link href={"/my_library"} style={[styles.link, pathname === "/my_library" && styles.acctiveLink]}>My Library</Link>
      </View>

    </View >
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A9A9',
  },
  content: {
    flex: 1,
    backgroundColor: '#696969',

  },
  topBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333333'
  },
  link: {
    color: '#FFFFFF',
    fontSize: 16
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333333',
    paddingVertical: 15,
  },
  acctiveLink: {
    color: '#FFD700',
    textShadowColor: '#FFD&00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  }
})

export default AppsLayout;