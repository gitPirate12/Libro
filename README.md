**Libro - Basic Library MERN App**
==================================

**Libro** is a simple library management web application built using the **MERN stack** (MongoDB, Express, React, Node.js). The app allows users to perform basic **CRUD (Create, Read, Update, Delete)** operations on books in a library. This project is intended as a basic library system that can be easily extended with additional features.

**Features**
------------

*   **Book Management:**
    
    *   Add new books to the library.
        
    *   View the list of books with their details (e.g., title, author, genre, and description).
        
    *   Update details of existing books (e.g., change title, author, genre).
        
    *   Delete books from the library.
        
*   **Search Functionality:**
    
    *   Users can search for books by title, author, or genre.
        

**Tech Stack**
--------------

*   **Frontend:**
    
    *   React.js: A JavaScript library for building user interfaces.
        
    *   Axios: Promise-based HTTP client for making requests to the backend API.
        
*   **Backend:**
    
    *   Node.js: JavaScript runtime for building the backend server.
        
    *   Express.js: A minimal web application framework for Node.js.
        
    *   MongoDB: A NoSQL database to store book data.
        
    *   Mongoose: A MongoDB object modeling tool that works in an asynchronous environment.
        

**Installation**
----------------

### **Prerequisites**

Ensure you have the following installed:

*   **Node.js** (preferably the latest LTS version)
    
*   **MongoDB** (locally or via a MongoDB cloud service like MongoDB Atlas)
    

### **Steps**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gitPirate12/Libro.git
   cd Libro
    
2. **Install dependencies for both the frontend and backend:**


    ```bash
    cd backend
    npm install
    ```

    ```bash
    cd frontend
    npm install
    ```

        
3.  In the backend directory, create a `.env` file and add your MongoDB connection string:

    ```env
    MONGODB_URI=your_mongo_connection_string
    ```

    
4.  **Run the application:**

    ```bash
    cd backend
    npm start
    ```
     ```bash
     cd frontend
     npm start
     ```
