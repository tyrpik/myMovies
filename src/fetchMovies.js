require('dotenv').config({ path: './src/.env' });

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { addMovieIfNotExists } = require('./models');

const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=300&sort_by=popularity.desc';
const API_KEY = process.env.TMDB_API_KEY;

async function fetchAndSaveMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };

    try {
        const response = await fetch(API_URL, options);
        const data = await response.json();
        //console.log('TMDb API response:', data);

        const movies = data.results;

        for (const movie of movies) {
            await addMovieIfNotExists(
                movie.id,
                movie.title,
                movie.poster_path,
                movie.release_date,
                movie.vote_average,
                movie.popularity,
                movie.adult
            );
        }

        console.log('Movies synced with database.');
    } catch (err) {
        console.error('Error fetching data from TMDb:', err.message);
    }
}

module.exports = fetchAndSaveMovies;
