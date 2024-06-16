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

const Upcoming = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Upcoming</Text>
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
    margin: 16,
    padding: 0,
    margin: 0,
  },
  text: {
    padding: 8,
    fontSize: 20,
    tfontWeight: "bold",
    color: "white",
  },
});

export default Upcoming;
