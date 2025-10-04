import express from "express";
import {
  getBooks,
  // getBookById,
  createBook
} from "../controllers/bookController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getBooks);           // GET all books with pagination
// router.get("/:id", protect ,getBookById);     // GET single book details

// Protected Routes (logged-in users)
router.post("/add-book", protect,createBook);       // Add book


export default router;
