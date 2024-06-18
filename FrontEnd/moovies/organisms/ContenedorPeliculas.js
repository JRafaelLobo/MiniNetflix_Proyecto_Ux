import React from "react";
import {
  ImageBackground,
  Button,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import ContinueWatching from "../molecules/ContinueWatching";
import Favorites from "../molecules/Favorites";
import Popular from "../molecules/Popular";
import TopRated from "../molecules/TopRated";
import Upcoming from "../molecules/Upcoming";

const image = require("../assets/peliculasbg.jpg");

function Home({ navigation }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ContinueWatching />
      <Favorites />
      <Popular />
      <TopRated />
      <Upcoming />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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