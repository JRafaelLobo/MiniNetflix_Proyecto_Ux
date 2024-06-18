const axios = require('axios');
const apiKey = process.env.axiosApiKey;




// Función para obtener los datos de una película
const getMovieDataID = async (movieId) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;  // Lanza el error para que el llamador también pueda manejarlo
    }
};

const getMovieDataName = async (query) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: apiKey,
                query: query // Utiliza el parámetro query aquí
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;  // Lanza el error para que el llamador también pueda manejarlo
    }
};

const getRandomMovies = async (numPeliculas) => {
    const urlBase = "https://api.themoviedb.org/3/movie/";
    let peliculas = [];

    if (!numPeliculas || isNaN(numPeliculas) || numPeliculas <= 0) {
        throw new Error('Número de películas no válido');
    }

    try {
        for (let index = 0; index < numPeliculas; index++) {
            const idAleatorio = Math.floor(Math.random() * 1000000); // Genera un ID aleatorio
            try {
                const movieData = await getMovieDataID(idAleatorio);
                if (movieData && movieData.id) {
                    peliculas.push(movieData);
                } else {
                    index--; // Si no se encontró una película válida, intenta con otro ID
                }
            } catch (error) {
                console.error(`Error al obtener la película con ID ${idAleatorio}:`, error.message);
                index--; // Si hubo un error, intenta con otro ID
            }
        }
        return peliculas;
    } catch (error) {
        throw new Error('Error al buscar las películas: ' + error.message);
    }
};

const getVideoIds = async (idPelicula) => {
    if (!idPelicula) {
        throw new Error('No se proporcionó el ID de la película');
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${idPelicula}/videos`, {
            params: {
                api_key: apiKey
            }
        });

        const videos = response.data.results.map(video => video.key);
        return videos;
    } catch (error) {
        throw new Error('Error al obtener videos: ' + error.message);
    }
};

const getMoviesByCategoryRandom = async (categoryId, numPeliculas) => {
    const urlBase = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`;
    let peliculas = [];

    if (!numPeliculas || isNaN(numPeliculas) || numPeliculas <= 0) {
        throw new Error('Número de películas no válido');
    }

    try {
        const response = await axios.get(urlBase);
        const totalPages = response.data.total_pages;

        for (let index = 0; index < numPeliculas; index++) {
            const randomPage = Math.floor(Math.random() * totalPages) + 1; // Genera un número de página aleatorio
            const pageResponse = await axios.get(`${urlBase}&page=${randomPage}`);
            const movies = pageResponse.data.results;

            if (movies && movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                peliculas.push(randomMovie);
            } else {
                index--; // Si no se encontró una película válida, intenta con otra página
            }
        }
        return peliculas;
    } catch (error) {
        throw new Error('Error al buscar las películas: ' + error.message);
    }
};

// Exportar la función
module.exports = { getMovieDataID, getMovieDataName, getRandomMovies, getMoviesByCategoryRandom, getVideoIds }
