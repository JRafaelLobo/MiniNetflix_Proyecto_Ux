import React from "react";
import axios from "axios";
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
const image = require("../assets/movieinfobg.jpeg");

function MovieInfo({ navigation }) {
  const realizarPeticion = async () => {
    let url = "http://localhost:3000/api/peliculas/encontrarPorNombre";
    const data = {
      nombre: "Star Wars",
    };
    const config = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        //tokens
      },
    };
  };
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    axios
      .post(url, data, config)
      .then((respuesta) => {
        console.log(respuesta.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Movie</Text>
        <Image
          style={styles.titleimage}
          source={require("../assets/demo.jpg")}
        />
      </ImageBackground>
    </View>
  );
}
const { width: deviceWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titleimage: {
    width: deviceWidth,
    height: 250,
    justifyContent: "flex-start",
    resizeMode: "cover",
  },
  text: {
    marginTop: 20,
    marginLeft: 20,
    color: "#79C0B2",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
  },
});

export default MovieInfo;
