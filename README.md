# The Book Heaven

**The Book Heaven** is a modern web application designed for book lovers to explore, manage, and discover books. The site features a clean and responsive interface, animations, and user-friendly functionalities.

**Live Site:** https://assignment-10-the-book-heaven.netlify.app/

---

## Features

- 📚 **Browse Latest & All Books**: View the latest releases and explore the full collection of books with ratings and details.  
- ⭐ **Book of the Week**: Highlighted featured book based on high ratings.  
- 📝 **User Book Management**: Authenticated users can add, update, or delete their books.  
- 🔥 **Animations & Interactive UI**: Smooth transitions and hover effects using Framer Motion.  
- 🌓 **Dark Mode Support**: Toggle between light and dark themes seamlessly.  
- 👀 **Tooltips & Alerts**: Helpful tooltips for buttons and SweetAlert2 for confirmations.  
- 🌐 **Authentication**: Firebase-based authentication with email/password and Google Sign-In.  

---

## Technologies Used

- **Frontend:** React  
- **Styling:** Tailwind CSS, DaisyUI  
- **Routing:** React Router  
- **Icons:** Lucide React Icons  
- **Animations:** Framer Motion  
- **Alerts & Confirmations:** SweetAlert2  
- **Authentication & User Management:** Firebase  
- **HTTP Requests:** Axios  
- **Tooltips:** react-tooltip  
- **Date Utilities:** date-fns  
- **Custom Components:** Loading spinner, responsive tables, cards, and buttons  

---

## Installation & Setup

1. Clone the repository:

Navigate to the project directory:


Copy code
cd the-book-heaven
Install dependencies:


Copy code
npm install
Start the development server:


Copy code
npm start

## Folder Structure (Client Side)

- **src/**
  - **components/** – Reusable components like BookCard, LoadingSpinner, etc.
  - **pages/** – Page components like AllBooks, MyBooks, BookOfTheWeek, Register, etc.
  - **Provider/** – Context providers such as AuthContext
  - **Firebase/** – Firebase configuration and utilities
  - **App.jsx** – Main application component
  - **index.jsx** – Entry point of the application


Future Improvements
Add book search and filter functionalities.

Implement pagination for the books table.

Add reviews and ratings for each book.

Enable profile customization for users.

License
This project is open-source and available under the MIT License.

Author

Your Name – Tajbin Ovie