import React from "react";
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
