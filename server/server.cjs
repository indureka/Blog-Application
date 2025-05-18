const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes.cjs');
const blogRoutes=require('./routes/blogRoutes.cjs');
const dotenv = require('dotenv');
const cors = require('cors');

// Config
dotenv.config();
// dotenv.config({ path: __dirname + '/.env' });


const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
  process.env.FRONTEND_URL, 
    'https://enchanting-croissant-c415ac.netlify.app'
  ],
  credentials: true,
}));

// app.use(cors());
app.use(express.json());

// Routes Placeholder
app.get('/', (req, res) => {
  res.send('Blog API is running...');
});

// Auth Routes
app.use('/auth', authRoutes);

//Blog Routes
app.use('/blogs', blogRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('MongoDB connected');
  // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

    app.listen(PORT, () => console.log(`Server running on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`));
}).catch(err => console.log(err));
