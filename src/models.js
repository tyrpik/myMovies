const db = require('./config/db');

exports.addMovie = (title, poster_path, release_date, vote_average, popularity, adult, callback) => {
    db.run(
        `INSERT INTO Movies (title, poster_path, release_date, vote_average, popularity, adult)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [title, poster_path, release_date, vote_average, popularity, adult],
        callback
    );
};

exports.deleteMovie = (id, callback) => {
    db.run(
        `DELETE FROM Movies WHERE id = ?`,
        [id],
        function (err) {
            callback(err, this.changes);
        }
    );
};

exports.modifyMovie = (id, title, poster_path, release_date, vote_average, popularity, adult, callback) => {
    let query, params;

    if (poster_path) {
        query = `
            UPDATE Movies
            SET title = ?, poster_path = ?, release_date = ?, vote_average = ?, popularity = ?, adult = ?
            WHERE id = ?
        `;
        params = [title, poster_path, release_date, vote_average, popularity, adult, id];
    } else {
        query = `
            UPDATE Movies
            SET title = ?, release_date = ?, vote_average = ?, popularity = ?, adult = ?
            WHERE id = ?
        `;
        params = [title, release_date, vote_average, popularity, adult, id];
    }

    db.run(query, params, callback);
};

exports.loadMovies = (sort, callback) => {
    let query = 'SELECT * FROM Movies';

    if (sort === 'title_asc') {
        query += ' ORDER BY title COLLATE NOCASE ASC';
    } else if (sort === 'title_desc') {
        query += ' ORDER BY title COLLATE NOCASE DESC';
    } else if (sort === 'popularity') {
        query += ' ORDER BY popularity DESC'
    } else if (sort === 'vote_average') {
        query += ' ORDER BY vote_average DESC'
    }

    db.all(query, [], callback);
};

exports.searchMovies = (searchTerm, callback) => {
    const query = 'SELECT * FROM Movies WHERE LOWER(title) LIKE ?';
    const term = `%${searchTerm.toLowerCase()}%`;

    db.all(query, [term], callback);
};

exports.addMovieIfNotExists = (api_id, title, poster_path, release_date, vote_average, popularity, adult) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Movies WHERE api_id = ?`, [api_id], (err, row) => {
            if (err) return reject(err);

            if (!row) {
                db.run(
                    `INSERT INTO Movies (api_id, title, poster_path, release_date, vote_average, popularity, adult)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [api_id, title, poster_path, release_date, vote_average, popularity, adult],
                    (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            } else {
                resolve();
            }
        });
    });
};
