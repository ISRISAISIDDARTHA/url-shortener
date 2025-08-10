import Url from "../models/Url.js";
import { addUrl, findUrlByCode, findUrlsByUserId, deleteUrlById } from "../config/memoryStorage.js";
import shortid from "shortid";
import mongoose from "mongoose";

// @desc    Create short URL (Public - no auth required)
// @route   POST /api/urls/public
// @access  Public
const createPublicShortUrl = async (req, res) => {
  try {
    const { originalUrl, title, description } = req.body;

    // Validation
    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ message: 'Please provide a valid URL' });
    }

    // If MongoDB is connected, save in database
    if (mongoose.connection.readyState === 1) {
      try {
        const urlCode = shortid.generate();
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        
        const url = await Url.create({
          urlCode,
          originalUrl,
          shortUrl: `${baseUrl}/${urlCode}`,
          title,
          description,
          // userId intentionally omitted for public URLs
        });
        return res.status(201).json(url);
      } catch (error) {
        console.error('MongoDB error while creating public URL, falling back to memory storage:', error);
        // Fall through to memory storage
      }
    }

    // Create URL in memory storage
    const urlCode = shortid.generate();
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    const url = {
      id: Date.now().toString(),
      urlCode,
      originalUrl,
      shortUrl: `${baseUrl}/${urlCode}`,
      userId: null, // No user associated with public URLs
      clicks: 0,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addUrl(url);
    res.status(201).json(url);
  } catch (error) {
    console.error('Create public URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create short URL (Private - requires auth)
// @route   POST /api/urls
// @access  Private
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, title, description } = req.body;
    const userId = req.user._id || req.user.id;

    // Validation
    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ message: 'Please provide a valid URL' });
    }

    // Use MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const urlCode = shortid.generate();
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        
        const url = await Url.create({
          urlCode,
          originalUrl,
          shortUrl: `${baseUrl}/${urlCode}`,
          title,
          description,
          userId
        });

        return res.status(201).json(url);
      } catch (error) {
        console.error('MongoDB error, falling back to memory storage:', error);
        // Fall through to memory storage
      }
    }
    
    // Create URL in memory storage
    const urlCode = shortid.generate();
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    const url = {
      id: Date.now().toString(),
      urlCode,
      originalUrl,
      shortUrl: `${baseUrl}/${urlCode}`,
      userId,
      clicks: 0,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addUrl(url);
    res.status(201).json(url);
  } catch (error) {
    console.error('Create URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's URLs
// @route   GET /api/urls/user
// @access  Private
const getUserUrls = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // Use MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const urls = await Url.find({ userId }).sort({ createdAt: -1 });
        return res.json(urls);
      } catch (error) {
        console.error('MongoDB error, falling back to memory storage:', error);
        // Fall through to memory storage
      }
    }
    
    // Get URLs from memory storage
    const urls = findUrlsByUserId(userId);
    res.json(urls);
  } catch (error) {
    console.error('Get URLs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete URL
// @route   DELETE /api/urls/:id
// @access  Private
const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    // Use MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const url = await Url.findById(id);
        
        if (!url) {
          return res.status(404).json({ message: 'URL not found' });
        }

        // Check if user owns the URL
        if (url.userId?.toString() !== userId) {
          return res.status(401).json({ message: 'Not authorized' });
        }

        await url.deleteOne();
        return res.json({ message: 'URL deleted successfully' });
      } catch (error) {
        console.error('MongoDB error, falling back to memory storage:', error);
        // Fall through to memory storage
      }
    }
    
    // Delete URL from memory storage
    const url = findUrlsByUserId(userId).find(u => u.id === id);
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const deleted = deleteUrlById(id);
    if (deleted) {
      res.json({ message: 'URL deleted successfully' });
    } else {
      res.status(500).json({ message: 'Failed to delete URL' });
    }
  } catch (error) {
    console.error('Delete URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Redirect to original URL
// @route   GET /:urlCode
// @access  Public
const redirectToUrl = async (req, res) => {
  try {
    const { urlCode } = req.params;

    // Use MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const url = await Url.findOne({ urlCode });
        
        if (!url) {
          return res.status(404).json({ message: 'URL not found' });
        }

        // Increment clicks
        url.clicks += 1;
        await url.save();

        return res.redirect(url.originalUrl);
      } catch (error) {
        console.error('MongoDB error, falling back to memory storage:', error);
        // Fall through to memory storage
      }
    }
    
    // Find URL in memory storage
    const url = findUrlByCode(urlCode);
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Increment clicks
    url.clicks += 1;
    
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { createShortUrl, createPublicShortUrl, getUserUrls, deleteUrl, redirectToUrl }; 