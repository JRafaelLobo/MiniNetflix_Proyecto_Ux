import axios from "axios";
import {
  Button,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import Pelicula from "../atoms/pelicula";
const peliculaInfo = {
  Nombre: "React Native Movie",
  NomDirector: "Jane Doe",
};

const Popular = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Popular</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <Pelicula data={peliculaInfo} />
        <Pelicula data={peliculaInfo} />
        <Pelicula data={peliculaInfo} />
        <Pelicula data={peliculaInfo} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    height: 325,
    borderRadius: 10,
    overflow: "hidden",
    margin: 16, // Add margin to create the gap between cards
  },
  text: {
    padding: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default Popular;
