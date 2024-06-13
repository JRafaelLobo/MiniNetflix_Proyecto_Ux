import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const image = require('../assets/fondoLogin.jpg');

const Login = ({ navigation }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Moovies</Text>
        <View style={styles.container}>
          <Text style={styles.loginTitle}>Log In</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput style={styles.input} placeholder="Enter your username" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
          </View>
          <Button title="Login" onPress={() => navigation.replace('Home')} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 10,
    width: '80%',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default Login;