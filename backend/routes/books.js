const express = require('express')
const multer = require('multer')  // Import multer
const {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
    downloadBook,
    getGenres,
    getLatestBooks
} = require('../controllers/bookController')

const router = express.Router()

// Multer configuration for file upload
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as buffers
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20MB
});

//Static Routes

// Get genres
router.get('/genres', getGenres)

// GET all books
router.get('/', getBooks)

// Get latest books  
router.get('/latest', getLatestBooks)

// POST a new book with file uploads
router.post('/', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), addBook)


// Dynamic Routes

// GET a single book
router.get('/:id', getBook)

// DELETE a book
router.delete('/:id', deleteBook)

// UPDATE a book
// Assuming multer is set up with upload.fields() for handling multiple file uploads
router.put('/:id', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), updateBook);


// DOWNLOAD a book
router.get('/:id/download', downloadBook)






module.exports = router
