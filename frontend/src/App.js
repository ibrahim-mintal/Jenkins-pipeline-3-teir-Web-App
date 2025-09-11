import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieForm from './MovieForm';
import MovieList from './MovieList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const API = `${process.env.REACT_APP_API_URL}/api`;

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function loadMovies() {
    try {
      const res = await axios.get(`${API}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  const addMovie = async (movie) => {
    try {
      const res = await axios.post(`${API}/movies`, movie);
      setMovies(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      width: '100vw',
      height: '100vh',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(255,255,255,0.1)',
      color: '#e0e0e0'
    }}>
      <h1 style={{
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2.5em'
      }}>🎬 Movie Review App</h1>
      <div style={{ marginBottom: '30px' }}>
        <MovieForm addMovie={addMovie} />
      </div>
      <MovieList movies={movies} selectMovie={setSelectedMovie} />
      {selectedMovie && (
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(255,255,255,0.1)'
        }}>
          {selectedMovie.image_url && (
            <img
              src={selectedMovie.image_url}
              alt={`${selectedMovie.title} poster`}
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
          )}
          <h2 style={{
            color: '#cccccc',
            marginBottom: '20px'
          }}>Reviews for: {selectedMovie.title} ({selectedMovie.year})</h2>
          <ReviewForm movieId={selectedMovie.id} onPosted={() => window.location.reload()} />
          <ReviewList movieId={selectedMovie.id} />
        </div>
      )}
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        color: '#aaaaaa',
        fontSize: '0.9em'
      }}>
        &copy; {new Date().getFullYear()} Movie Review App by Ibrahim Mintal
      </footer>
    </div>
  );
}

export default App;
