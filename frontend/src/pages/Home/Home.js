import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Img from '../pages/Home/Img2.png';
import Img from './Img2.png';


import { useNavigate } from "react-router-dom";


const Home = () => {
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();


// Fetch all books from the backend
useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books/'); // Make sure this endpoint is correct
      response.data.forEach((book, index) => {
        console.log(`Book ${index + 1}:`, book);
      });
      
      setBooks(response.data); // Set the fetched books to state
    } catch (error) {
      console.error("Error fetching books:", error); // Handle errors
    }
  };

  fetchBooks();
}, []); 

useEffect(() => {
  const fetchLatestBooks = async () => {
    try {
      const response = await axios.get('/api/latest'); // Adjust URL if necessary
      // response.data.forEach((book, index) => {
      //   console.log(`Book ${index + 1}: ${JSON.stringify(book)}`);
      // });
      
      setBooks(response.data); // Update the existing books state with the fetched data
    } catch (error) {
      console.error("Error fetching the latest books", error);
    } 
  };

  fetchLatestBooks();
}, []);


 // Filter books based on search query
 const handleSearch = (query) => {
  setSearchQuery(query); // Update the search query
  if (query.trim() !== '') {
    const lowerCaseQuery = query.toLowerCase();

    const filtered = books.filter((book) =>
      book.title?.toLowerCase().includes(lowerCaseQuery) ||
      book.author?.toLowerCase().includes(lowerCaseQuery) ||
      book.genre?.toLowerCase().includes(lowerCaseQuery)
    );

    console.log('Filtered Books:', filtered); 
    setFilteredBooks(filtered); // Update the filtered books list
    setShowDropdown(true); // Show the dropdown
  } else {
    setFilteredBooks([]); // Clear the dropdown if query is empty
    setShowDropdown(false); // Hide the dropdown
  }
};

// Hide dropdown when clicking outside
const handleBlur = () => {
  setTimeout(() => setShowDropdown(false), 200); // Delay to allow click on dropdown items
};
  

  // Fetch genres from the backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/books/genres'); 
        console.log(response.data);
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <section
        className="book-search-container"
        style={{
          marginTop: "30px",
          backgroundImage: `url(${Img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "25px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          height: "100vh",
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <h1
          className="search-title"
          style={{
            color: "white",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "3rem",
            fontWeight: 900,
          }}
        >
          Discover your next favorite book
        </h1>
        <div className="search-form-wrapper" style={{ position: "relative", width: "300px" }}>
          <form
            className="search-form"
            role="search"
            onSubmit={(e) => e.preventDefault()} // Prevent form submission
          >
            <input
              type="search"
              id="book-search"
              className="search-input"
              placeholder="Search for a book, author, or genre"
              aria-label="Search for a book, author, or genre"
              style={{
                paddingLeft: "10px",
                borderRadius: "5px",
                padding: "10px",
                border: "1px solid #ccc",
                outline: "none",
                height: "50px",
                width: "110%",
                boxSizing: "border-box",
              }}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)} // Filter books as user types
              onFocus={() => setShowDropdown(true)} // Show dropdown on focus
              onBlur={handleBlur} // Hide dropdown on blur
            />
            <button
      type="submit"
      className="search-button"
      style={{
        position: "absolute", // Position the button on top of the input
        right: "-25px", // Align it to the right edge
        top: "50%", // Vertically center it
        transform: "translateY(-62%)", // Adjust for vertical centering
        height: "40px", // Match the input height
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        padding: "0 20px", // Add padding for button content
        borderRadius: "5px", // Rounded corners to blend with the input
        cursor: "pointer",
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: '700',
      }}
    >
      Search
    </button>
          </form>
          {showDropdown && filteredBooks.length > 0 && (
            <ul
              className="dropdown-list"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                zIndex: 10,
                padding: "10px 0",
                listStyleType: "none",
                margin: 0,
              }}
            >
              

              {filteredBooks.map((book) => (
                 console.log('Book object:', book), // Log to check if book object is defined
                <li
                  key={book._id}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => {
                    console.log('Selected book ID:', book._id);  // Log to check if _id is defined
                    setSearchQuery(book.title); // Set the search query to the selected book
                    setShowDropdown(false); // Hide the dropdown
                    navigate(`/view-book/${book._id}`); // Navigate to the book's detail page
                  }}
                >
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Browse by Genre Section */}
      <section className="browse-genre" style={{ width: '100%' }}>
        <h2 
          className="genre-heading" 
          style={{
            color: 'rgba(18, 20, 23, 1)',
            padding: '20px 16px 12px',
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: '700',
            fontSize: '22px',
            lineHeight: '1',
            maxWidth: '100%',
            marginLeft: '70px'
          }}
        >
          Browse by genre
        </h2>

        <section 
          className="genre-tags" 
          aria-label="Book Genres" 
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'flex-start',
            gap: '12px',
            overflow: 'hidden',
            color: '#121417',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            padding: '12px',
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: '500',
            fontSize: '14px',
            marginLeft: '60px'
          }}
        >
          {genres.map((genre) => (
            <button 
              key={genre} 
              className="genre-tag" 
              style={{
                borderRadius: '12px',
                backgroundColor: '#f0f2f5',
                display: 'flex',
                minHeight: '32px',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                justifyContent: 'center',
                padding: '0 16px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: '500',
                fontSize: '14px',
                color: '#121417'
              }}
            >
              {genre}
            </button>
          ))}
        </section>
      </section>

      


      <section
      className="newly-added-section"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        overflow: "auto",
      }}
    >
      <h2
        className="newly-added-heading"
        style={{
          color: "#121417",
          padding: "20px 16px 12px",
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: "700",
          fontSize: "22px",
          lineHeight: "1",
          maxWidth: "100%",
          marginRight: "1100px",
        }}
      >
        Newly Added
      </h2>

      <div
        style={{
          width: 960,
          padding: 16,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 12,
          display: "flex",
          marginRight: "270px",
        }}
      >
        <div
          style={{
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 12,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {books.map((book, index) => (
            <div
              key={book._id || index} // Use book _id if available, otherwise fall back to index
              style={{
                width: 176,
                paddingBottom: 12,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "flex",
              }}
            >
              
              <div
                style={{
                  alignSelf: "stretch",
                  height: "auto",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#121417",
                    fontSize: 16,
                    fontFamily: "Work Sans",
                    fontWeight: "500",
                    lineHeight: "24px",
                    wordWrap: "break-word",
                  }}
                >
                  {book.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </div>
  );
};

export default Home;
