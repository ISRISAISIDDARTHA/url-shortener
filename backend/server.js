import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check if MongoDB is connected
let isMongoConnected = false;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "URL Shortener API is running",
    mongoConnected: isMongoConnected,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/", urlRoutes); // Root route for redirects

const PORT = process.env.PORT || 5000;

// Start server with error handling
const startServer = async () => {
  try {
    isMongoConnected = await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
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