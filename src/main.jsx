import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './Pages/Home.jsx';
import Register from './Components/Register.jsx';
import AllBooks from './Components/AllBooks.jsx';
import Login from './Components/Login.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Profile from './Components/Profile.jsx';
import UpdateProfile from './Components/UpdateProfile.jsx';
import AddBook from './Components/AddBook.jsx';
import BookDetails from './Components/BookDetails.jsx';
import MyBooks from './Components/MyBooks.jsx';
import UpdateBook from './Components/UpdateBook.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/books",
        element: <AllBooks></AllBooks>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile></UpdateProfile>
      },
      {
        path: "/add-book",
        element: <AddBook></AddBook>
      },
      {
        path: "/books/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "/update-book/:id",
        element: <UpdateBook></UpdateBook>,
        loader: ({params}) => fetch(`http://localhost:3000/books/${params.id}`)
      },
      {
        path: "/my-books",
        element: <MyBooks></MyBooks>,
      },
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
