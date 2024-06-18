import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
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
    let url = "http://192.168.0.1:3000/api/peliculas/encontrarPorNombre";

    const body = {
      nombre: "Star Wars",
    };

    const config = {
      headers: {
        "Content-Type": " application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(url, body, config);
      console.log("La respuesta del backend ", res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(
          "Error en la peticion response",
          error.response.data.descripcion
        );
      } else {
        console.log("Error en la peticion otro", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Movie</Text>
        <Button
          onPress={realizarPeticion}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
