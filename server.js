require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Route Imports
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const articlesRoutes = require('./routes/articles');
const youtubeRoutes = require('./routes/youtubeVideos');
const workshopsRoutes = require('./routes/workshops');
const settingsRoutes = require('./routes/settings');
const teamRoutes = require('./routes/team');
const cloudinaryRoutes = require('./routes/cloudinary');
const guestsRoutes = require('./routes/guests');
const networkRoutes = require('./routes/network');

// 1. Body Parser Middleware (Must be before routes)
app.use(express.json());

// 2. Bulletproof CORS Configuration
const allowedOrigins = [
  'http://localhost:3000', // Un-commented so your local testing works!
  'http://localhost:5173', // Vite local testing
  'https://tiesverse.com'  // Your future live domain
];

// Safely add the environment variable if it exists in Render
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or postman/curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // CRITICAL for auth/login to work!
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/youtube-videos', youtubeRoutes);
app.use('/api/workshops', workshopsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/guests', guestsRoutes);
app.use('/api/network', networkRoutes);

// 4. Root Health Check
app.get('/', (req, res) => {            
    res.json({ message: 'TiesVerse API is running perfectly!' });
}); 

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
