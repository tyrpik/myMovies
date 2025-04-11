const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'movies_db.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('ERROR - connecting to database', err.message);
    } else {
        console.log('Connected to database');
        initializeDatabase();
    }
});

// Initializing table
function initializeDatabase() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Movies (
                id INTEGER PRIMARY KEY,
                api_id INTEGER,
                title TEXT,
                poster_path TEXT,
                release_date TEXT,
                vote_average REAL,
                popularity REAL,
                adult BOOLEAN
            )
        `);

    });
}
module.exports = db;