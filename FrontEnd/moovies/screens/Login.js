// screens/Login.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";

const background = require("../assets/fondoLogin.jpg");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://54.242.173.32:3000/api/usuario/logIn",
        { email, password }
      );
      if (response.status === 200) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require("../assets/logomoovies.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Moovies</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Log In" onPress={handleLogin} color="#E50914" />
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 280,
    height: 280,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  signupButton: {
    color: "#E50914",
    fontWeight: "bold",
  },
});

export default Login;
