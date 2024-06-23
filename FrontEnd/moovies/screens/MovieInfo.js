import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const image = require("../assets/movieinfobg.jpeg");
function MovieInfo({ route }) {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/InterVariable.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  const { data } = route.params;
  const { title, poster_path, release_date, overview, video, vote_average } =
    data;
  const [showFullOverview, setShowFullOverview] = useState(false);

  const overviewContent = overview
    ? overview
    : "There is no overview available for this film";

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  const truncatedOverview =
    overviewContent && overviewContent.length > 100
      ? `${overviewContent.slice(0, 100)}...`
      : overviewContent;
  const overviewToShow = overviewContent;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : "https://www.themoviedb.org/t/p/w1280/6XJM3C47iGOK9nFU6yLFCSf4U5c.jpg";

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Image
          resizeMode="cover"
          style={styles.titleimage}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.viewMoreContainer}>
          <Text style={styles.overviewText}>
            {showFullOverview ? overviewToShow : truncatedOverview}
          </Text>
          {overview && overview.length > 100 && (
            <View style={styles.viewMoreTextContainer}>
              <MaterialIcons
                name={showFullOverview ? "expand-less" : "expand-more"} // Use Material Icon names
                size={24}
                color="white"
                onPress={toggleOverview}
              />
              <Text style={styles.viewMoreText} onPress={toggleOverview}>
                {showFullOverview ? "View Less" : "View More"}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.favoriteContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => alert("Pressed!")}
          >
            <MaterialCommunityIcons name="star" size={30} color="gold" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/blueletterlogo.png")}
          />
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </ImageBackground>
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
    height: 350,
    justifyContent: "flex-start",
    resizeMode: "cover",
  },
  titleText: {
    fontFamily: "Inter",
    marginTop: 35,
    marginBottom: 15,
    marginLeft: 20,
    color: "#79C0B2",
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  overviewText: {
    fontFamily: "Inter",
    margin: 10,
    color: "white",
    fontSize: 15,
  },
  viewMoreContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  viewMoreTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  viewMoreText: {
    color: "gray",
    fontSize: 14,
    marginLeft: 5,
  },
  tinyLogo: {
    width: 120,
    height: 50,
    resizeMode: "cover",
  },
  contentContainer: {
    alignItems: "flex-end",
    margin: 10,
  },
  favoriteContainer: {
    margin: 5,
    alignItems: "flex-start",
  },
});

export default MovieInfo;
