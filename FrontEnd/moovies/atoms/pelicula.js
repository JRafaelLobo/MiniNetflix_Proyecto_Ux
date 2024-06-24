import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";

const Pelicula = (props) => {
  const navigation = useNavigation();
  const { title, poster_path, release_date, overview, id, vote_average } =
    props.data;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : "https://www.themoviedb.org/t/p/w1280/6XJM3C47iGOK9nFU6yLFCSf4U5c.jpg";
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.09}
        onPress={() => {
          navigation.navigate("MovieInfo", props);
        }}
      >
        <View style={styles.CardVideo}>
          <Image
            style={styles.VideoImg}
            source={{
              uri: imageUrl,
            }}
          />
          <View style={styles.InfoVideo}>
            <Text style={styles.InfoVideoTitle}>{title}</Text>
            <Text style={styles.InfoVideoRating}>Rating: {vote_average}</Text>
            <Text style={styles.InfoVideoFecha}>
              Realease date: {release_date}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
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
  InfoVideoRating: {
    fontSize: 14,
    color: "white",
    textAlign: "center", // Center the text
  },
  InfoVideoFecha: {
    fontSize: 9,
    color: "gray",
    textAlign: "left",
  },
});
export default Pelicula;
