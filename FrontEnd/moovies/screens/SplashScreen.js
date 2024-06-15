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
    //<ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
    //</ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: '80%', // Ajusta el tamaño del logo según sea necesario
    maxHeight: '50%', // Ajusta la altura máxima del logo según sea necesario
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
});

export default SplashScreen;