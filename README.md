# 🎬 Movie Review App

A full-stack web application for managing and reviewing movies, built with React, Node.js, Express, and PostgreSQL. The app integrates with the OMDB API to automatically fetch movie posters and information.

## 🏗️ Architecture

This is a 3-tier web application consisting of:

- **Frontend**: React application served by Nginx
- **Backend**: Node.js/Express API server
- **Database**: PostgreSQL database

### Containerized Deployment

The application uses Docker Compose for container orchestration with the following services:

- **movie-frontend**: React app (port 3000)
- **movie-backend**: Express API (port 5000)
- **movie-db**: PostgreSQL database (port 5432)

## ✨ Features

- 📽️ **Movie Management**: Add movies with automatic poster fetching from OMDB API
- ⭐ **Review System**: Add and view reviews with 1-5 star ratings
- 🎨 **Modern UI**: Clean, responsive React interface
- 🔧 **Admin Interface**: Backend admin panel at `/admin` for viewing all movies and reviews
- 🐳 **Docker Support**: Complete containerization for easy deployment
- 📊 **Database Integration**: PostgreSQL with proper schema and relationships

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [OMDB API Key](http://www.omdbapi.com/apikey.aspx) (free tier available)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movie-review-app
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
OMDB_API_KEY=your_omdb_api_key_here
```

### 3. Deploy with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin
- **Database**: localhost:5432 (accessible from host)

## 🛠️ Development Setup

### Backend Development

```bash
cd movie-review-app/backend

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Or start production server
npm start
```

### Frontend Development

```bash
cd movie-review-app/frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Database Setup

The PostgreSQL database is automatically initialized with the schema defined in `movie-review-app/db/init.sql` when the containers start.

## 📡 API Endpoints

### Movies

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add a new movie
  - Body: `{ "title": "Movie Title", "year": 2023 }`

### Reviews

- `GET /api/movies/:id/reviews` - Get reviews for a specific movie
- `POST /api/movies/:id/review` - Add a review for a movie
  - Body: `{ "review_text": "Great movie!", "rating": 5 }`

### Admin

- `GET /admin` - View all movies and reviews in a web interface

## 🗄️ Database Schema

### Movies Table

```sql
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    year INT,
    image_url VARCHAR(500)
);
```

### Reviews Table

```sql
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    review_text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5)
);
```

## 🔧 Configuration

### Environment Variables

- `OMDB_API_KEY`: Your OMDB API key for fetching movie posters
- `DB_HOST`: Database host (default: db)
- `DB_USER`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_NAME`: Database name (default: moviesdb)

### Docker Configuration

The application uses multi-stage Docker builds for optimized production images:

- **Backend**: Node.js Alpine image with production dependencies
- **Frontend**: Nginx serving built React app
- **Database**: PostgreSQL Alpine image with persistent volume

## 📁 Project Structure

```
movie-review-app/
├── backend/                 # Node.js/Express API
│   ├── server.js           # Main server file
│   ├── db.js              # Database connection
│   ├── package.json       # Backend dependencies
│   └── Dockerfile         # Backend container config
├── frontend/               # React application
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container config
├── db/                    # Database files
│   └── init.sql          # Database schema
└── docker-compose.yml     # Container orchestration
```

## 🧪 Testing

### Manual Testing

1. Add a movie using the frontend form
2. Verify the movie appears in the list with a poster
3. Click on a movie to view its details
4. Add a review for the movie
5. Check the admin panel at `/admin` to see all data

### API Testing

```bash
# Get all movies
curl http://localhost:5000/api/movies

# Add a movie
curl -X POST http://localhost:5000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title": "The Matrix", "year": 1999}'
```

## 🚀 Deployment

### Production Deployment

1. Set up your production environment with Docker and Docker Compose
2. Configure environment variables securely
3. Use a reverse proxy (nginx) for SSL termination
4. Set up database backups and monitoring
5. Configure CI/CD pipeline for automated deployments

### Scaling Considerations

- **Database**: Use connection pooling and read replicas for high traffic
- **Backend**: Implement caching and rate limiting
- **Frontend**: Use CDN for static assets
- **Monitoring**: Add logging and monitoring with tools like Prometheus/Grafana

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for movie data and posters
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- [PostgreSQL](https://www.postgresql.org/) for the database
- [Docker](https://www.docker.com/) for containerization

---

**Happy Reviewing! 🎬🍿**
