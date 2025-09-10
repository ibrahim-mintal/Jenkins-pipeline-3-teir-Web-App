import React from "react";

function MovieList({ movies, selectMovie }) {
  return (
    <div>
      <h2 style={{
        color: '#ffffff',
        marginBottom: '20px',
        textAlign: 'center'
      }}>Movies</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px',
        padding: '0 10px'
      }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #555',
              borderRadius: '8px',
              padding: '15px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 4px rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}
            onClick={() => selectMovie(movie)}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 4px 8px rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(255,255,255,0.1)';
            }}
          >
            {movie.image_url && (
              <img
                src={movie.image_url}
                alt={`${movie.title} poster`}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
            )}
            <h3 style={{
              margin: '0 0 10px 0',
              color: '#e0e0e0',
              fontSize: '1.2em'
            }}>{movie.title}</h3>
            <p style={{
              margin: 0,
              color: '#aaaaaa',
              fontSize: '0.9em'
            }}>Year: {movie.year || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
