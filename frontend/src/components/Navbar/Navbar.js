import React from 'react';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useNavigate } from 'react-router-dom';





const Header = () => {
  
  // Use navigate hook to handle routing
  const navigate = useNavigate();

  // Redirect to the "Add Book" page when the button is clicked
  const handleClick = () => {
    navigate('/add-book'); // This will redirect to the "Add Book" page
  };
  
  
  return (
    <header style={{
      position: 'relative',         // Ensures it stays within the flow of the page
      width: '100%',                // Full page width without overflow
      maxWidth: '100vw',            // Ensures it doesn’t exceed viewport width
      borderBottom: '1px solid #e5e8eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 40px',
      boxSizing: 'border-box'       // Includes padding in width calculation
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', minWidth: '240px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '16px' }}>
            <div style={{ display: 'flex', minHeight: '16px', width: '16px', flex: 1 }}></div>
          </div>
          <span style={{ color: '#121417', font: '700 18px/1 "Work Sans", sans-serif' }}>Libro</span>
        </div>
        
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', justifyContent: 'flex-end', flexWrap: 'wrap', flex: 1 }}>
        

        
        

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Button for Add Book */}
      <button 
       onClick={handleClick} style={{
        borderRadius: '12px',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        width: 'auto', // Change width to auto to adjust to the text size
        padding: '0 12px', // Add padding to create space for the text
        height: '40px',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px', // Optional: Adjust font size
        
      }}>
        Add Book
      </button>


  

  
  

</div>

      </div>
    </header>
  );
};

export default Header;
