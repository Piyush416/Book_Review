import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BooksDetails';
import NotFoundPage from './pages/NotFoundPage';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/book-details" element={<BookDetails />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)



function App() {

  return (
    <>
    <div className='h-screen'>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={route} />
    </div>
    </>
  )
}

export default App
