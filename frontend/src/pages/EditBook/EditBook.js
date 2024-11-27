import React, { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Ensure Sonner is installed and imported
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests

function EditBookForm() {
  const { id } = useParams(); // Extract book ID from the URL
  const navigate = useNavigate();

  // State variables for book details and form fields
  const [bookDetails, setBookDetails] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [cover, setCover] = useState(null); // File for cover
  const [pdf, setPdf] = useState(null);     // File for PDF

  // Fetch book details on component mount using Axios
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setBookDetails(data);
          setTitle(data.title);
          setAuthor(data.author);
          setGenre(data.genre);
          setSummary(data.summary);
          setPublicationDate(data.publicationDate);
        } else {
          toast.error('Failed to fetch book details');
        }
      } catch (error) {
        toast.error('Error: ' + error.message);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('summary', summary);
    formData.append('publicationDate', publicationDate);
    if (cover) formData.append('cover', cover); // Only append if a new cover is uploaded
    if (pdf) formData.append('pdf', pdf);       // Only append if a new PDF is uploaded

    try {
      const response = await axios.put(`/api/books/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Book updated successfully!');
        navigate('/'); // Navigate back to the home page
      } else {
        toast.error('Error: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Request failed: ' + error.message);
    }
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  // New function to handle "Back" button click
  const handleBack = () => {
    navigate(`/view-book/${id}`); // Navigate to the book's detail page
  };

  if (!bookDetails) {
    return <p>Loading book details...</p>;
  }

  return (
    <div style={{ width: '908px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 8px' }}>
        <h2
          style={{
            color: '#1C170D',
            fontSize: '40px',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: '900',
            lineHeight: '45px',
            font: '"Work Sans", sans-serif',
          }}
        >
          Edit Book Details
        </h2>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', width: '80%' }}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. The Great Gatsby"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="E.g. F. Scott Fitzgerald"
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="E.g. Fiction"
          />
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter a summary"
            style={{ height: '120px', resize: 'none', width: '75%' }}
          />
        </div>
        <div>
          <label htmlFor="publicationDate">Publication Date</label>
          <input
            type="date"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cover">Upload a New Cover</label>
          <input type="file" id="cover" accept="image/*" onChange={handleCoverChange} />
        </div>
        <div>
          <label htmlFor="pdf">Upload a New PDF</label>
          <input type="file" id="pdf" accept="application/pdf" onChange={handlePdfChange} />
        </div>
        <button type="submit">Update Book</button>
        {/* Back button to navigate to book details */}
        <button type="button" onClick={handleBack} style={{ marginTop: '10px' }}>
          Back
        </button>
      </form>
    </div>
  );
}

export default EditBookForm;
