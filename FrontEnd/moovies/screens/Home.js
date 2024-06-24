// screens/Home.js
import React, { useState } from 'react';
import {
  ImageBackground,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import ContenedorPeliculas from '../organisms/ContenedorPeliculas.js';

const image = require('../assets/peliculasbg.jpg');
const logo = require('../assets/logomoovies.png'); // Asegúrate de tener el logo en esta ruta

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    let url = "http://35.239.132.201:3000/api/peliculas/encontrarPorNombre";

    const body = {
      nombre: searchQuery,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.post(url, body, config);
      if (res.data && res.data.length > 0) {
        setSearchResults(res.data);
        setIsSearching(true);
      } else {
        console.log("No data found in the response.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error in the request:", error.response.data.descripcion);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://35.239.132.201:3000/api/usuario/logOut');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong with logout');
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for movies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button title="Search" onPress={handleSearch} color="#E50914" />
        </View>
        {isSearching && (
          <TouchableWithoutFeedback onPress={clearSearch}>
            <View style={styles.searchOverlay}>
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.movieContainer}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                  </View>
                )}
              />
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
        {!isSearching && <ContenedorPeliculas />}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 150,
    height: 75,
    resizeMode: 'contain',
  },
  logoutButton: {
    backgroundColor: '#E50914',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  searchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  movieContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#E50914',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;