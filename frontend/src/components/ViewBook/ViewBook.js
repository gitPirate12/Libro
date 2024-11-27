import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import './ViewBook.css';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";



function ViewBook() {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // State to hold the book details
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate();


  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Example: November 24, 2024
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  
  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.delete(`/api/books/${id}`); // Adjust the endpoint to match your API
      toast.success('Book deleted successfully!');
      navigate('/'); // Redirect to the home page or another route
    } catch (error) {
      // Handle errors gracefully
      const errorMessage =
        error.response?.data?.message || 'Failed to delete the book.';
      toast.error(errorMessage);
    }
  };
  ///edit-book/:id

  const handleEdit = async (e) => {
    e.preventDefault();
    navigate(`/edit-book/${id}`);
    
  };

  


const handleDownload = async (e) => {
  e.preventDefault();

  try {
    // Fetch the PDF as a Blob
    const response = await axios.get(`/api/books/${id}/download`, {
      responseType: 'blob', // Ensure the response is treated as binary data
    });

    // Create a URL for the Blob
    const pdfUrl = window.URL.createObjectURL(new Blob([response.data]));

    // Create a link element for downloading
    const link = document.createElement('a');
    link.href = pdfUrl;

    // Set the filename for the download (you can adjust this)
    link.setAttribute('download', `${id}.pdf`);

    // Append the link, trigger the click, and then remove the link
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    // Show success message
    toast.success('Book downloaded successfully!');
  } catch (error) {
    // Handle errors gracefully
    const errorMessage =
      error.response?.data?.error || 'Failed to download the book.';
    toast.error(errorMessage);
  }
};

  

  // Fetch the book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`); // Adjust the endpoint as necessary
        setBook(response.data); // Update the book state with the fetched data
        setLoading(false); // Stop the loading spinner
      } catch (err) {
        setError('Error fetching book details'); // Handle errors
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show a loading message
  if (error) return <p>{error}</p>; // Show an error message if fetching fails

  return (
    <div
      style={{
        width: '90%',
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#F7FAFC',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        font: '"Work Sans", sans-serif',
        position: 'relative', // Make this relative for the absolute positioning of the Edit button
      }}
    >
      {/* Edit Button */}
      <button
        style={{
          position: 'absolute', // Absolute positioning
          top: '20px', // Top-right corner
          right: '20px',
          height: '40px',
          background: '#F7FAFC',
          borderRadius: '12px',
          border: 'none',
          color: '#0D141C',
          fontSize: '14px',
          fontWeight: 700,
          font: '"Work Sans", sans-serif',
          cursor: 'pointer',
        }}
      >
         <MoreVertOutlinedIcon style={{ fontSize: '20px' }} onClick={handleEdit} />
      </button>

      {/* Cover Image and Book Info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <img
          style={{
            width: '300px',
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
          src={book.cover || 'https://via.placeholder.com/300x400'}
          alt={`${book.title} cover`}
        />
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: '#4F7396',
              fontSize: '16px',
              fontWeight: 500,
              font: '"Work Sans", sans-serif',
              marginBottom: '5px',
            }}
          >
            {book.genre}
          </p>
          <h1
            style={{
              color: '#0D141C',
              fontSize: '28px',
              fontWeight: 700,
              font: '"Work Sans", sans-serif',
              marginBottom: '10px',
            }}
          >
            {book.title}
          </h1>
          <p
            style={{
              color: '#4F7396',
              fontSize: '18px',
              fontWeight: 400,
              font: '"Work Sans", sans-serif',
              marginBottom: '5px',
            }}
          >
            By {book.author}
          </p>
          <p
            style={{
              color: '#4F7396',
              fontSize: '16px',
              fontWeight: 400,
              font: '"Work Sans", sans-serif',
            }}
          >
            Published on: {formatDate(book.publicationDate)}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div>
        <p
          style={{
            color: '#4F7396',
            fontSize: '16px',
            fontWeight: 400,
            font: '"Work Sans", sans-serif',
            lineHeight: '1.6',
          }}
        >
          {book.summary || 'No summary available for this book.'}
        </p>
      </div>

      {/* Buttons */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <button className="hover-button" onClick={handleClick} >
  <DeleteOutlineOutlinedIcon style={{ fontSize: '25px' }} />
</button>

<button className="hover-button2"  onClick={handleDownload}>
  <FileDownloadOutlinedIcon style={{ fontSize: '25px' }} />
</button>

      </div>
    </div>
  );
}

export default ViewBook;
