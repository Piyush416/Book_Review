import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
// app.use(cors());


app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // Routes

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
