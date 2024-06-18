import React from "react";
import {
  ImageBackground,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ContenedorPeliculas from "../organisms/ContenedorPeliculas.js";

const image = require("../assets/peliculasbg.jpg");

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ContenedorPeliculas />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  titleimage: {
    height: 250,
    justifyContent: "flex-start",
    resizeMode: "cover",
  },
});

export default Home;
