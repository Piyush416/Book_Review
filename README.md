# 📚 Book Review App

Welcome to the Book Review App! This platform allows users to discover books, write reviews, and share ratings with the community.

## 🌐 Live Demo

Check out the live application here:  
[https://book-review-logiksurtaai.vercel.app/](https://book-review-logiksurtaai.vercel.app/)

## 🛠️ Features

- User authentication (signup/login)  
- Browse and search books  
- Add and read book reviews  
- Rate books with a star rating system  
- Responsive design for desktop and mobile  

## 💻 Technologies Used

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Deployment:** Vercel (frontend)

## 🧪 Postman API Collection

You can test all backend APIs using Postman. Import the collection JSON file from this repository:

- **Postman Collection JSON:** [`Book_Review_API_Collection.postman_collection.json`](./Book_Review_API_Collection.postman_collection.json)  
- **Base URL:** `http://localhost:5000/api` (or your deployed backend URL)  

APIs included:
- `POST /api/auth/signup` – Register a new user  
- `POST /api/auth/login` – Login user  
- `GET /api/books?page=1` – Get all books  
- `POST /api/createbook` – Add a new book  
- `GET /api/books/:id` – Get book details  
- `POST /api/reviews` – Add a review for a book


## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/Piyush416/Book_Review.git
cd Book_Review

//first run backend
cd backend
npm intall
node server.js    // you need database credential for connect to database

//second run frontend
cd frontend
npm install
npm run dev
