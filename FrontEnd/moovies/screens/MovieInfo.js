import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
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
  const [showFullOverview, setShowFullOverview] = useState(false);

  const { data } = route.params;
  const { title, poster_path, release_date, overview, video, vote_average } =
    data;

  console.log(video);
  const handlePlayVideo = () => {
    if (video) {
      setModalVisible(true);
    } else {
      alert("No trailer available for this film.");
    }
  };

  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/InterVariable.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

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
        <TouchableOpacity style={styles.button} onPress={handlePlayVideo}>
          <MaterialIcons name="play-arrow" size={40} color="#79C0B2" />
          <Text style={styles.buttonText}>Play Trailer</Text>
        </TouchableOpacity>
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
      {video && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Video
              source={{ uri: video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              useNativeControls
              style={styles.video}
            />
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </Modal>
      )}
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#37596D",
    padding: 10,
    margintop: 5,
    marginBottom: 5,
  },
  buttonText: {
    fontFamily: "Inter",
    color: "#79C0B2",
    fontStyle: "italic",
    fontSize: 20,
    marginLeft: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  video: {
    width: deviceWidth - 40,
    height: 300,
    backgroundColor: "black",
  },
  favoriteContainer: {
    margin: 5,
    alignItems: "flex-start",
  },
});

export default MovieInfo;
