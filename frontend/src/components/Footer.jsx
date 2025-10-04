import { BookOpen, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
              <BookOpen className="h-6 w-6" />
              BookReview
            </Link>
            <p className="mt-3 text-sm">
              A MERN-powered platform where readers can explore, add, and review books.  
              Share your thoughts and discover new favorites 📚✨
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/add-book" className="hover:text-indigo-600">Add a Book</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-600">Profile</Link></li>
              <li><Link to="/login" className="hover:text-indigo-600">Login</Link></li>
              <li><Link to="/signup" className="hover:text-indigo-600">Signup</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/logiksutraai/" target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/Piyush416" target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                <Github className="h-5 w-5" />
              </a>
              
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-6 text-sm text-center">
          © {new Date().getFullYear()} BookReview. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
