const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const db = require('./config/db');
const Movie = require('./models');

require('dotenv').config({ path: './src/.env' });
const fetchAndSaveMovies = require('./fetchMovies');

// Setting views ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting css formatting
app.use(express.static(path.join(__dirname, 'public')));

//handling JSON POSTs
app.use(express.json());

app.get('/', (req, res) => {
    const sort = req.query.sort;
    const search = req.query.search;

    if (search) {
        Movie.searchMovies(search, (err, movies) => {
            if (err) {
                console.error('Error loading movies:', err.message);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('movies', { movies });
            }
        });
    } else {
        Movie.loadMovies(sort, (err, movies) => {
            if (err) {
                console.error('Error loading movies:', err.message);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('movies', { movies });
            }
        });
    }
});

const movieRoutes = require('./routes');
app.use('/', movieRoutes);

app.get('/edit', (req, res) => res.render('edit'));

fetchAndSaveMovies();
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));