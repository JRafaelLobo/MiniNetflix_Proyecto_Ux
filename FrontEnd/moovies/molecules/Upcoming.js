import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Pelicula from "../atoms/pelicula";

const Upcoming = () => {
  const [movieData, setMovieData] = useState([
    {
      title: "",
      poster_path: "",
      release_date: "",
      overview: "",
      id: "",
      vote_average: "",
    },
  ]);
  const realizarPeticion = async () => {
    let url =
      "http://35.239.132.201:3000/api/peliculas/obtenerAleatorioPorCategorias";

    const body = {
      endpoint: "upcoming",
      cantidad: "4",
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(url, body, config);
      const responseData = res.data;
      if (Array.isArray(responseData) && responseData.length > 0) {
        const mappedData = responseData.map((movie) => ({
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          overview: movie.overview,
          id: movie.id,
          vote_average: movie.vote_average,
        }));
        setMovieData(mappedData);
      } else {
        console.log("No movie data found in the response.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error in the request:", error.response.data.descripcion);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    realizarPeticion();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Upcoming</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {movieData.map((movie, index) => (
          <Pelicula key={index} data={movie} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    height: 370,
    borderRadius: 10,
    overflow: "hidden",
    margin: 16,
    padding: 0,
  },
  text: {
    padding: 8,
    fontSize: 20,
    tfontWeight: "bold",
    color: "white",
  },
});

export default Upcoming;
