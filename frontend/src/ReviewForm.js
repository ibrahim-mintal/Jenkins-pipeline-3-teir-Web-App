import React, { useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/api`;

function ReviewForm({ movieId }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/movies/${movieId}/review`, {
        review_text: text,
        rating: parseInt(rating)
      });
      setText('');
      setRating(5);
      // naive reload
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} style={{
      marginBottom: 20,
      backgroundColor: '#2a2a2a',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #555',
      boxShadow: '0 2px 4px rgba(255,255,255,0.1)',
      color: '#e0e0e0'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#e0e0e0'
        }}>Your Review:</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your review here..."
          required
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1em',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#1a1a1a',
            color: '#e0e0e0',
            resize: 'vertical',
            minHeight: '80px'
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <label style={{
          fontWeight: 'bold',
          color: '#e0e0e0'
        }}>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '1em',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#1a1a1a',
            color: '#e0e0e0',
            width: '60px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            fontSize: '1em',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#218838'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#28a745'}
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
