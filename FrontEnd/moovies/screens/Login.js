import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import LoginForm from '../screens/LoginForm';
import SignUpForm from '../screens/SignUpForm';

const logo = require('../assets/logomoovies.png');
const background = require('../assets/fondoLogin.jpg');


const Login = () => {
  const [view, setView] = useState('home');

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <LoginForm onBack={() => setView('home')} />;
      case 'signup':
        return <SignUpForm onBack={() => setView('home')} />;
      default:
        return (
          <View style={styles.buttonContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <TouchableOpacity style={styles.button} onPress={() => setView('login')}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setView('signup')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.overlay}>
        {renderContent()}
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff5733',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;