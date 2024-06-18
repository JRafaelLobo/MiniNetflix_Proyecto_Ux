import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';

const logo = require('../assets/logomoovies.png');
const background = require('../assets/peliculasbg.jpg');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
});

export default SplashScreen;