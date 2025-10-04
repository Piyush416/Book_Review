import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import API from "../api"

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("Authorization");
      const {data} = await API.post("/books/add-book", formData, { headers: { Authorization: token } });
      toast.success(data.message || "Book Added.");
    }
    catch(err)
    {
      if(err.response.status == 401)
        toast.error(err.response.data.message || "Already Exist");
      else
        toast.error(err.response.data.message);
    }

  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Add a New Book 📖</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter book title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Author</label>
          <input
            type="text"
            name="author"
            placeholder="Enter author's name"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            placeholder="Write a short description..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select a genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Programming">Programming</option>
            <option value="Finance">Finance</option>
            <option value="Biography">Biography</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Published Year</label>
          <input
            type="number"
            name="year"
            placeholder="e.g., 2021"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
