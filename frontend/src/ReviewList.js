import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    axios.get(`${API}/movies/${movieId}/reviews`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [movieId]);

  if (!reviews || reviews.length === 0) return <p style={{
    textAlign: 'center',
    color: '#aaaaaa',
    fontStyle: 'italic'
  }}>No reviews yet.</p>;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{
          color: i <= rating ? '#ffc107' : '#ddd',
          fontSize: '1.2em'
        }}>★</span>
      );
    }
    return stars;
  };

  return (
    <div>
      <h3 style={{
        color: '#cccccc',
        marginBottom: '15px'
      }}>Reviews</h3>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {reviews.map(r => (
          <li key={r.id} style={{
            backgroundColor: '#333333',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #555',
            boxShadow: '0 1px 3px rgba(255,255,255,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              {renderStars(r.rating)}
              <span style={{
                marginLeft: '10px',
                fontWeight: 'bold',
                color: '#e0e0e0'
              }}>{r.rating}/5</span>
            </div>
            <p style={{
              margin: 0,
              color: '#e0e0e0',
              lineHeight: '1.5'
            }}>{r.review_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
