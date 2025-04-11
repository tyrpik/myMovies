# 🎬 myMovies

A simple Node.js application that fetches and stores movies from the TMDb API and allows you to manage them (add/edit/delete) via a web interface.

## Features
- Fetch movies from the TMDb API and store them in a local SQLite database
- Add, delete, and modify movie entries
- Upload posters for movies
- Sort and search functionality
- MVC architecture using Express, EJS, and SQLite

---

## Setup Instructions

### 1. Clone or download the repository
git clone https://github.com/your-username/myMovies.git
cd myMovies

If you haven't cloned the repository, you can download it as a ZIP from GitHub and extract it to your local machine.

### 2. Install dependencies
npm install
This will install all dependencies listed in package.json, including Express, SQLite, and other required packages.

### Create .env file in src folder
TMDB_API_KEY=<your_tmdb_API_key_goes_here>
replace <your_tmdb_API_key_goes_here> with your API key (you can get one on https://www.themoviedb.org/settings/api)

### Run the application
npm run dev
This will start the server with nodemon and sync movie data from the TMDb API.

### Visit the app in your browser
http://localhost:3000

### Notes
Make sure not to commit your real .env file or API key.
The SQLite database file is created automatically on first run.
