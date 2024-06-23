import React, { useEffect } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";

const background = require("../assets/SplashScreen.png");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
});

export default SplashScreen;
