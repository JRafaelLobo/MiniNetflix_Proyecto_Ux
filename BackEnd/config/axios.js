const axios = require('axios');

// Función para obtener los datos de una película
const getMovieData = async (movieId, apiKey) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;  // Lanza el error para que el llamador también pueda manejarlo
    }
};

// Exportar la función
module.exports = getMovieData;
