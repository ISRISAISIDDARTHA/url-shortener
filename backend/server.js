import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration for production
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        'https://your-frontend-domain.vercel.app', // Update this with your actual frontend URL
        'https://your-frontend-domain.netlify.app' // Update this with your actual frontend URL
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Check if MongoDB is connected
let isMongoConnected = false;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "URL Shortener API is running",
    mongoConnected: isMongoConnected,
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/", urlRoutes); // Root route for redirects

// Start server with error handling
const startServer = async () => {
  try {
    isMongoConnected = await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
      console.log(`🔐 Auth endpoint: http://localhost:${PORT}/api/auth/register`);
      console.log(`🔗 URL endpoint: http://localhost:${PORT}/api/urls`);
      console.log(`❤️  Health check: http://localhost:${PORT}/health`);
      
      if (!isMongoConnected) {
        console.log(`⚠️  Using in-memory storage (data will be lost on restart)`);
      } else {
        console.log(`✅ MongoDB connected successfully`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 