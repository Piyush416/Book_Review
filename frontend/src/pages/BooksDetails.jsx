import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API from "../api";




export default function BookDetailsPage() {

  const location = useLocation();

  const [reviews, setReviews] = useState([]);
  const book = location.state?.book;

  if (!book) return <p>Book not found.</p>;

  const [newReview, setNewReview] = useState({ rating: 0, text: "" });

  const [currUserId, setcurrUserId] = useState(null);

  const hasReviewed = reviews.some(rev => rev.user_id._id === currUserId);


  useEffect(() => {
  const userId = sessionStorage.getItem("currUserId");
  if (userId) {
    setcurrUserId(userId);
    console.log("Current User ID:", userId);
  }
}, []);


  // get all the review of selected book
  useEffect(() => {
    const fetchAllReview = async () => {
      try {
        const { data } = await API.get(`/reviews/${book._id}`);
        setReviews(data.reviews);
      }
      catch (err) {
        toast.error(err);
        console.log(err);
      }
    }
    fetchAllReview();
  }, [book._id]);



  // submit review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.text || newReview.rating === 0) {
      toast.warning("Please enter text and rating!");
      return;
    }

    const reviewData = {
      book_id: book._id,
      user_id: currUserId, // current logged-in user
      rating: newReview.rating,
      text: newReview.text,
    };

    try {
      const token = localStorage.getItem("Authorization");
      const { data } = await API.post(
        "/reviews/createReview",
        reviewData,
        { headers: { Authorization: token } }
      );

      toast.success(data.message, "Review Submitted");

      // Add the new review to the list immediately
      setReviews((prev) => [data.review, ...prev]);
      setNewReview({ rating: 0, text: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.error(err);
    }
  };




  // Edit
  const [isEdit, setisEdit] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const handleEditReviewClick = (rev) => {
    setisEdit(true);
    setNewReview({ rating: rev.rating, text: rev.text });
    setEditingReviewId(rev._id);
  };


  // Submit edited review
  const handleEditReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("Authorization");
      await API.put(
        `/reviews/${editingReviewId}`,
        newReview,
        { headers: { Authorization: token } }
      );
      toast.success("Review updated!");
      setisEdit(false);

      // Update review in state
      setReviews(
        reviews.map((r) =>
          r._id === editingReviewId ? { ...r, ...newReview } : r
        )
      );
      setNewReview({ rating: 0, text: "" });
    } catch (err) {
      console.log(err)
      toast.error("Failed to update review");
    }
  };



  // Delete
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("Authorization");
      await API.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: token }
      });
      toast.success("Review deleted!");
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete review");
    }
  };




  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Book Info */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">{book.title}</h1>
        <p className="text-gray-600 mt-1">by {book.author}</p>
        <p className="mt-3 text-sm text-gray-500">
          Genre: <span className="font-medium">{book.genre}</span> | Year:{" "}
          {book.year}
        </p>
        <p className="mt-4 text-gray-700">{book.description}</p>

      </div>



      {/* Edit Form */}
      {isEdit && (
        <form onSubmit={handleEditReviewSubmit} className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Your Rating
            </label>
            <div className="flex space-x-2 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  className={`h-6 w-6 cursor-pointer ${i < newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Your Review
            </label>
            <textarea
              placeholder="Write your thoughts..."
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              rows="3"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Edit Review
            </button>
            <button
              type="button"   // ← Important: prevent form submit
              onClick={() => setisEdit(false)} // ← Cancel editing
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}



      {/* Reviews Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {/* Review Form */}
        {!hasReviewed && (
          <form onSubmit={handleReviewSubmit} className="mb-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Your Rating
              </label>
              <div className="flex space-x-2 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                    className={`h-6 w-6 cursor-pointer ${i < newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Your Review
              </label>
              <textarea
                placeholder="Write your thoughts..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                rows="3"
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Review
            </button>
          </form>
        )}


        {/* Review List */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{rev.user_id.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(rev.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rev.rating ? "fill-yellow-400" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-gray-600">{rev.text}</p>

              {rev.user_id._id.toString() === currUserId && (
                <div className="flex space-x-3 mt-2">
                  <button
                    onClick={() => handleEditReviewClick(rev)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(rev._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}


      </div>
    </div>
  );
}
