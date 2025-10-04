import Review from "../models/Review.js";


// get all review by book_id
export const getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book_id: req.params.bookId }).sort({ createdAt: -1 }).populate("user_id", "name"); 
    res.status(201).json({reviews});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//create Review
export const createReview = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { book_id , rating, text } = req.body;
    
    const createdReview = await Review.create({
      rating,
      text,
      book_id,
      user_id,
    });

     const populatedReview = await createdReview.populate("user_id", "name");

    res.status(201).json({success:"true",
      message:"Review Submitted",review : populatedReview
    });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};


//update Review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });


    review.rating = req.body.rating || review.rating;
    review.text = req.body.text || review.text;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();
    res.json({ message: "Review removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
