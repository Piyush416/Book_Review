import express from "express";
import {
  getReviewsByBook,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:bookId", getReviewsByBook);

// Protected Routes (logged-in users)
router.post("/createReview", protect, createReview);        // Add review to a book
router.put("/:id", protect, updateReview);            // Edit review
router.delete("/:id", protect, deleteReview);         // Delete review

export default router;
