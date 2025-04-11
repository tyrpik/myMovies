const models = require('./models');

exports.homePage = (req, res) => {
    res.render("movies");
};

exports.addMovie = (req, res) => {
    const { title, release_date, vote_average, popularity, adult } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    models.addMovie(title, imagePath, release_date, vote_average, popularity, adult, (err) => {
        if (err) {
            console.error('ERROR - saving movie to database:', err);
            return res.send('Couldn\'t add movie');
        }
        res.send('Movie is sent correctly.')
    });
};

exports.deleteMovie = (req, res) => {
    const { id } = req.body;

    models.deleteMovie(id, (err, changes) => {
        if (err) {
            console.error('ERROR - deleteing movie from database:', err);
            return res.send('Couldn\'t delete movie');
        }

        res.send(`Movie "${id}" is deleted.`);
    });
};

exports.modifyMovie = (req, res) => {
    const { id, title, release_date, vote_average, popularity, adult } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;

    models.modifyMovie(id, title, imagePath, release_date, vote_average, popularity, adult, (err) => {
        if (err) {
            console.error('ERROR - modifying movie in database:', err);
            return res.status(500).send('Could not modify movie');
        }
        res.redirect('/');
    });
};
