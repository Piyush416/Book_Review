import { useState } from "react";
import { Star } from "lucide-react";
import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import API from '../api';


export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await API.get(`/books?page=${currentPage}`);
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, [currentPage]);




  // Filtered books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Book Collection 📚</h1>
        <input
          type="text"
          placeholder="Search by title, author, genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-72"
        />
      </div>

      {/* Book List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <p className="mt-2 text-sm text-gray-500">
              Genre: <span className="font-medium">{book.genre}</span>
            </p>
            <p className="text-sm text-gray-500">Year: {book.year}</p>

            {/* Rating */}
            <div className="flex items-center mt-3 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(book.avgRating) ? "fill-yellow-400" : "text-gray-300"
                    }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {book.avgRating.toFixed(1)}
              </span>
            </div>

            {/* View Details */}
            <button onClick={() => navigate("/book-details", { state: { book } })} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              View Details
            </button>
          </div>
        )) :
          // Skeleton Loading Cards
          (Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-xl shadow-md p-6 h-48"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          )))
        }
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === i + 1
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
