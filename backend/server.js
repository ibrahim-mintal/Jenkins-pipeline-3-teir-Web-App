// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const app = express();
app.use(cors());
app.use(express.json());

async function getMoviePoster(title, year) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    console.warn('OMDB_API_KEY not set, skipping poster fetch');
    return null;
  }

  try {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}${year ? `&y=${year}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
      return data.Poster;
    }
    return null;
  } catch (error) {
    console.error('Error fetching from OMDB API:', error);
    return null;
  }
}

// GET /api/movies
app.get('/api/movies', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM movies ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// POST /api/movies
app.post('/api/movies', async (req, res) => {
  const { title, year } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  // Always fetch image from OMDB API
  const finalImageUrl = await getMoviePoster(title, year);
  console.log('Fetched image URL for', title, ':', finalImageUrl);

  try {
    const result = await db.query(
      'INSERT INTO movies (title, year, image_url) VALUES ($1, $2, $3) RETURNING *',
      [title, year || null, finalImageUrl]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add movie' });
  }
});

// GET /api/movies/:id/reviews
app.get('/api/movies/:id/reviews', async (req, res) => {
  const movieId = parseInt(req.params.id);
  if (isNaN(movieId)) return res.status(400).json({ error: 'invalid id' });
  try {
    const result = await db.query(
      'SELECT * FROM reviews WHERE movie_id = $1 ORDER BY id',
      [movieId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/movies/:id/review
app.post('/api/movies/:id/review', async (req, res) => {
  const movieId = parseInt(req.params.id);
  const { review_text, rating } = req.body;
  if (isNaN(movieId)) return res.status(400).json({ error: 'invalid id' });
  if (!review_text || !rating) return res.status(400).json({ error: 'review_text and rating required' });
  try {
    const result = await db.query(
      'INSERT INTO reviews (movie_id, review_text, rating) VALUES ($1, $2, $3) RETURNING *',
      [movieId, review_text, rating]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET /admin - Simple backend interface to view movies and reviews
app.get('/admin', async (req, res) => {
  try {
    const moviesResult = await db.query('SELECT * FROM movies ORDER BY id');
    const movies = moviesResult.rows;

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backend Admin - Movies and Reviews</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; background-color: #1a1a1a; color: #e0e0e0; }
          header { background: #333333; color: #e0e0e0; padding: 20px 0; text-align: center; }
          h1 { margin: 0; font-size: 2.2em; }
          .movies-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .movie {
            background: #2a2a2a;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(255,255,255,0.1);
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .movie h2 {
            margin-top: 0;
            color: #cccccc;
            font-size: 1.2em;
            margin-bottom: 10px;
          }
          .movie img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .movie .no-image {
            width: 100%;
            height: 200px;
            background: #444444;
            color: #aaaaaa;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .reviews-section {
            flex-grow: 1;
          }
          .review {
            margin: 8px 0;
            padding: 8px;
            background: #333333;
            border-left: 3px solid #4a90e2;
            font-size: 0.9em;
          }
          .rating { font-weight: bold; color: #ffc107; }
          .no-reviews {
            font-style: italic;
            color: #aaaaaa;
            padding: 8px;
            font-size: 0.9em;
          }
          footer {
            text-align: center;
            color: #aaaaaa;
            margin: 40px 0 10px 0;
            font-size: 1em;
            clear: both;
          }

          /* Responsive design */
          @media (max-width: 1024px) {
            .movies-container {
              grid-template-columns: repeat(2, 1fr);
              padding: 15px;
            }
          }

          @media (max-width: 768px) {
            .movies-container {
              grid-template-columns: 1fr;
              padding: 10px;
            }
            .movie h2 {
              font-size: 1.1em;
            }
          }
        </style>
      </head>
      <body>
        <header>
          <h1>🎬 Backend Admin - Movies and Reviews</h1>
        </header>
        <div class="movies-container">
    `;

    for (const movie of movies) {
      const reviewsResult = await db.query('SELECT * FROM reviews WHERE movie_id = $1 ORDER BY id', [movie.id]);
      const reviews = reviewsResult.rows;

      html += `
        <div class="movie">
          <h2>${movie.title} (${movie.year || 'N/A'})</h2>
      `;
      if (movie.image_url) {
        html += `<img src="${movie.image_url}" alt="${movie.title}" style="max-width: 200px; height: auto; border-radius: 8px; margin-bottom: 10px;">`;
      } else {
        html += `
          <div class="no-image">
            No Image
          </div>
        `;
      }

      if (reviews.length === 0) {
        html += `<p class="no-reviews">No reviews yet.</p>`;
      } else {
        reviews.forEach(review => {
          const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
          html += `
            <div class="review">
              <div class="rating">${stars} ${review.rating}/5</div>
              <p>${review.review_text}</p>
            </div>
          `;
        });
      }

      html += `</div>`;
    }

    html += `
        </div>
      <footer>
        &copy; ${new Date().getFullYear()} Movie Review App Admin by : Ibrahim Mintal
      </footer>
    </body>
    </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Error loading admin page</h1>');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
