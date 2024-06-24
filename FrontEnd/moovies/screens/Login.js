import React, { useState, useEffect } from "react";
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
  const [emailLogin, setEmailLogin] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [passwordLogin, setPasswordLogin] = useState("");

  const CerrarSesion = async () => {
    const url = "http://35.239.132.201:3000/api/usuario/logOut";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(url, {}, config);
      console.log("mensaje logout: ", res.data);
    } catch (error) {}
  };

  useEffect(() => {
    CerrarSesion();
  }, []);

  const realizarPeticion = async () => {
    const url = "http://35.239.132.201:3000/api/usuario/logIn";

    const body = {
      email: emailLogin,
      password: passwordLogin,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(url, body, config);
      setResponseData(res.data);
      console.log("response data: ", res.data);
      return res.data;
    } catch (error) {
      console.log(error.config);
      if (error.response) {
        // The request was made, but the server responded with a status code that is not in the range of 2xx
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
        Alert.alert(
          "Error",
          error.response.data.descripcion || "Something went wrong"
        );
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("Error request:", error.request);
        Alert.alert(
          "Error",
          "No response received from server. Check your network."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
        Alert.alert("Error", "Network error. Please try again later.");
      }
    }
  };

  const handleLogin = async () => {
    const data = await realizarPeticion();
    console.log("response login: ", data);

    if (data && data.includes("Sesión inciada con éxito")) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require("../assets/red_letterlogo.png")}
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
            value={emailLogin}
            onChangeText={setEmailLogin}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={passwordLogin}
            onChangeText={setPasswordLogin}
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
    justifyContent: "center",
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
    width: 300,
    height: 300,
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
