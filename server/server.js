import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import bioRoutes from './routes/bioRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://portfolio-umer-nine.vercel.app', 'https://umeraziz-portfolio.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/contact', contactRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Umer Aziz Portfolio API' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('📧 Email Configuration:');
  console.log('  - EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
  console.log('  - EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ SET' : '❌ NOT SET');
  console.log('  - Password length:', process.env.EMAIL_PASSWORD?.length || 0);
});
