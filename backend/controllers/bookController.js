import Book from "../models/Book.js";
import Review from "../models/Review.js";

// get books with pagination
export const getBooks = async (req, res) => {
  try {
    const totalBooks= await Book.countDocuments();
    const page = parseInt(req.query.page) || 1; 
    const limit = 5;
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(totalBooks / limit);
    // Fetch books with pagination
    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .lean(); 

    // Calculate average rating for each book
    const booksWithRating = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book_id: book._id }).lean();
        const avgRating =
          reviews.length > 0
            ? Math.floor(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)
            : 0;
        return { ...book, avgRating, totalReviews: reviews.length };
      })
    );

    res.json({ books: booksWithRating, totalPages, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// create book 
export const createBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const exist = await Book.findOne({ title });
    if (exist) res.status(401).json({ success: "false", message: `${exist.title} Book is Already Exist.` });
    const book = await Book.create({ title, author, description, genre, year, user: req.user.userId });
    res.status(201).json({ success: "true", message: `${title} added SuccessFully` });
  } catch (err) {
    res.status(500).json({ success: "false", message: err.message });
  }
};

