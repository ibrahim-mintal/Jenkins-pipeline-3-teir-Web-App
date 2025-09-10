import React, { useState } from 'react';

function MovieForm({ addMovie }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    addMovie({ title, year: year ? parseInt(year) : null });
    setTitle('');
    setYear('');
  };

  return (
    <form onSubmit={submit} style={{
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'flex-start',  // Changed from 'center' to 'flex-start'
      gap: '10px',
      flexWrap: 'wrap'
    }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Movie title"
        required
        style={{
          padding: '8px 12px',
          fontSize: '1em',
          borderRadius: '4px',
          border: '1px solid #555',
          backgroundColor: '#2a2a2a',
          color: '#e0e0e0',
          flex: '1 1 150px',  // Reduced min width from 200px to 150px
          minWidth: '120px',  // Reduced minWidth
          maxWidth: '300px'   // Added maxWidth for better control
        }}
      />
      <input
        value={year}
        onChange={e => setYear(e.target.value)}
        placeholder="Year"
        type="number"
        style={{
          padding: '8px 12px',
          fontSize: '1em',
          borderRadius: '4px',
          border: '1px solid #555',
          backgroundColor: '#2a2a2a',
          color: '#e0e0e0',
          width: '100px',
          minWidth: '80px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          fontSize: '1em',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#4a90e2',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
          // Removed marginLeft to prevent overflow
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#357abd'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#4a90e2'}
      >
        Add Movie
      </button>
    </form>
  );
}

export default MovieForm;
