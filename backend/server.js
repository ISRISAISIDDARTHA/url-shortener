import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { redirectToUrl } from "./controllers/urlController.js";

dotenv.config();
const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration for production
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        'https://url-shortener-rust-six.vercel.app', // Your Vercel frontend
        'https://url-shortener-fr9d.onrender.com'   // Your Render backend
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

// Root route - API information
app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      urls: "/api/urls",
      redirect: "/:urlCode"
    },
    documentation: "Visit /health for API status"
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

// Redirect route for short URLs (must be last to catch short URL codes)
app.get("/:urlCode", (req, res) => {
  redirectToUrl(req, res);
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      "GET /",
      "GET /health", 
      "POST /api/auth/register",
      "POST /api/auth/login",
      "POST /api/urls",
      "GET /:urlCode"
    ]
  });
});

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