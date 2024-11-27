import React, { useState } from 'react';
import './AddBook.css';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('summary', summary);
    formData.append('publicationDate', publicationDate);
    formData.append('cover', cover);
    formData.append('pdf', pdf);
  
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        toast.success('Book added successfully!');
        navigate('/'); 
      } else {
        toast.error('Error: ' + await response.text());
      }
    } catch (error) {
      toast.error('Request failed: ' + error);
    }
  };
  

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const inputStyle = {
    width: '80%',
    height: '56px',
    padding: '15px',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DECF',
    fontSize: '16px',
    font: '"Work Sans", sans-serif',
    color: '#A1824A',
    lineHeight: '24px',
    outline: 'none',
  };

  const labelStyle = {
    marginBottom: '8px',
    color: '#1C170D',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    font: '"Work Sans", sans-serif',
  };

  const containerStyle = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '80%',
  };

  const buttonStyle = {
    width: '100%',
    height: '56px',
    backgroundColor: '#A1824A',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    font: '"Work Sans", sans-serif',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
  };

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
          Add a Book to Library
        </h2>
      </div>
      <form onSubmit={handleSubmit} style={{ ...containerStyle }}>
        <div style={containerStyle}>
          <label style={labelStyle} htmlFor="title">
            Title
          </label>
          <input
            style={inputStyle}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. The Great Gatsby"
          />
        </div>
        <div style={containerStyle}>
          <label style={labelStyle} htmlFor="author">
            Author
          </label>
          <input
            style={inputStyle}
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="E.g. F. Scott Fitzgerald"
          />
        </div>
        <div style={containerStyle}>
          <label style={labelStyle} htmlFor="genre">
            Genre
          </label>
          <input
            style={inputStyle}
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="E.g. Fiction"
          />
        </div>
        <div style={containerStyle}>
        <label style={labelStyle} htmlFor="summary">
          Summary
        </label>
        <textarea
          style={{
            ...inputStyle,  // Inherit from inputStyle
            height: '120px',  // Maintain height
            resize: 'none',   // Prevent resizing
            width: '75%'      // Set width to 80% (or any other value you prefer)
          }}
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter a summary"
        />
      </div>

        <div style={containerStyle}>
          <label style={labelStyle} htmlFor="publicationDate">
            Publication Date
          </label>
          <input
            style={inputStyle}
            type="date"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <div style={containerStyle}>
          <label style={labelStyle} htmlFor="pdf">
            <span style={{ marginLeft: '8px' }}>Upload a Book (PDF)</span>
          </label>
          <input
            style={{ display: 'none' }} // Hides the default file input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handlePdfChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById('pdf').click()}
            style={{
              width: '80%',
              padding: '16px',
              backgroundColor: 'white', // Background color
              color: '#A1824A', // Text color
              border: '1px solid #E8DECF', // Matching outline style
              textAlign: 'left', // Align text to the left
              borderRadius: '12px', // Optional: Rounded corners
              fontSize: '16px', // Font size
              font: '"Work Sans", sans-serif',
              lineHeight: '24px', // Consistent line height
              cursor: 'pointer', // Cursor pointer for better UX
            }}
          >
            <span>Choose a file</span>
          </button>
        </div>
        <div style={containerStyle}>
          <label style={labelStyle} htmlFor="cover">
            Upload a Cover
          </label>
          <input
            style={{ display: 'none' }} // Hide the default file input
            type="file"
            id="cover"
            accept="image/*"
            onChange={handleCoverChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById('cover').click()}
            style={{
              width: '80%',
              padding: '16px',
              backgroundColor: 'white', // Background color
              color: '#A1824A', // Text color
              border: '1px solid #E8DECF', // Matching outline style
              textAlign: 'left', // Align text to the left
              borderRadius: '12px', // Optional: Rounded corners
              fontSize: '16px', // Font size
              font: '"Work Sans", sans-serif',
              lineHeight: '24px', // Consistent line height
              cursor: 'pointer', // Cursor pointer for better UX
            }}
          >
            <span>Choose a file</span>
          </button>
        </div>
        <button style={{
              width: '63%',
              padding: '16px',
              backgroundColor: '#019863', // Background color
              color: 'white', // Text color
              border: '1px solid #E8DECF', // Matching outline style
              textAlign: 'center', // Align text to the left
              borderRadius: '30px', // Optional: Rounded corners
              fontSize: '16px', // Font size
              font: '"Work Sans", sans-serif',
              lineHeight: '24px', // Consistent line height
              cursor: 'pointer', // Cursor pointer for better UX
              marginLeft: '25px',
            }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBookForm;
