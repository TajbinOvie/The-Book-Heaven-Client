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
Tajbin Ovie

🚀 Run This Project on Your Local Machine

Follow the steps below to set up The Book Heaven locally.

1. Clone the Repository
git clone https://github.com/TANVIRANZUM/the-book-heaven.git

2. Navigate to the Project Folder
cd the-book-heaven

3. Install Dependencies
npm install

4. Create a .env File

Create a .env file in the root folder and add the required Firebase & server environment variables (example):

VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_msg_sender_id
VITE_appId=your_app_id
VITE_server_url=http://localhost:3000


Make sure your backend server is also running locally.

5. Start the Development Server
npm run dev

Your project will run at:

http://localhost:5173
