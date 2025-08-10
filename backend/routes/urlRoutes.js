import express from "express";
import { createShortUrl, createPublicShortUrl, getUserUrls, deleteUrl, redirectToUrl } from "../controllers/urlController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for creating short URLs (no authentication required)
router.post("/public", createPublicShortUrl);

// Protected routes (require authentication)
router.post("/", protect, createShortUrl);
router.get("/user", protect, getUserUrls);
router.delete("/:id", protect, deleteUrl);

// Public route for redirecting
router.get("/:urlCode", redirectToUrl);

export default router; 