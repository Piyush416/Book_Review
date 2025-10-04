import { useEffect, useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { Sun, Moon, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
 const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();


  // handle logut
  const handleLogout = ()=>
  {
    localStorage.removeItem("Authorization");   
    sessionStorage.removeItem("currUserId");
    navigate("/login")
  }


  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <BookOpen className="h-6 w-6" />
            BookReview
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-6 items-center font-medium">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            
            {/* <Link to="/profile" className="hover:text-indigo-600">Profile</Link> */}
            {!token ? (<>
              <Link to="/login" className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition">
              Login
            </Link>
              <Link to="/signup" className="px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              Signup
            </Link>
            </>
          ):<>
          <Link to="/add-book" className="hover:text-indigo-600">Add Book</Link>
          <NavLink to="/login" onClick={handleLogout} className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition">
              Logout
            </NavLink>
            </>}
            
            
          </div>

        </div>
      </div>
    </nav>
  );
}
