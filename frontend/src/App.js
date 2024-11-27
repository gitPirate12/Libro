import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddBook from './pages/AddBook/AddBook';
import { Toaster } from 'sonner'; // Import Toaster
import ViewBook from './components/ViewBook/ViewBook';
import EditBook from './pages/EditBook/EditBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/add-book" 
              element={<AddBook />} 
            />
            <Route 
              path="/view-book/:id" 
              element={<ViewBook />}
            />
            <Route 
              path="/edit-book/:id" 
              element={<EditBook />}
            />
          </Routes>
        </div>
        <Toaster  position="top-center" 
  duration={3000} 
  richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
