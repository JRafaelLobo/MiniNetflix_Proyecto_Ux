import axios from "axios";
import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";

const image = {
  uri: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
};

const Pelicula = (props) => {
  const { Nombre, NomDirector } = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.CardVideo}>
        <Image style={styles.VideoImg} source={image} />
        <View style={styles.InfoVideo}>
          <Text style={styles.InfoVideoTitle}>{Nombre}</Text>
          <Text style={styles.InfoVideoDirector}>{NomDirector}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardVideo: {
    alignItems: "center",
    width: 180,
    height: 300,
    margin: 10,
    padding: 0,
  },
  VideoImg: {
    width: 150,
    height: 200,
    borderRadius: 5,
    margin: 5,
    resizeMode: "cover",
  },
  InfoVideo: {
    flexDirection: "column", // Arrange text elements in a column
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  InfoVideoTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center", // Center the text
  },
  InfoVideoDirector: {
    fontSize: 14,
    color: "white",
    textAlign: "center", // Center the text
  },
});
export default Pelicula;
