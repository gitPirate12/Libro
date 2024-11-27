const Book = require('../models/bookModel')
const multer = require('multer')
const mongoose = require('mongoose')

// get all books
const getBooks = async (req, res) => {
  try {
    // Exclude the `pdf` field from the response
    const books = await Book.find({}, { pdf: 0 }).sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error });
  }
};



const getBook = async (req, res) => {
  const { id } = req.params;

  // Validate the provided ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid book ID format' });
  }

  try {
    // Fetch the book from the database
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Transform the cover image into a Base64 string
    const coverImage = book.cover
      ? `data:${book.cover.contentType};base64,${book.cover.data.toString('base64')}`
      : null;

    // Send the transformed book data to the client
    res.status(200).json({
      id: book._id.toString(), // Include the book's ID
      title: book.title,
      author: book.author,
      genre: book.genre,
      summary: book.summary,
      publicationDate: book.publicationDate,
      pdf: book.pdf, // If needed, handle the PDF similarly
      cover: coverImage, // Include the Base64-encoded cover
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching the book',
      details: error.message,
    });
  }
};



const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as buffers
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20MB
});

const addBook = async (req, res) => {
  // Log to check if text fields and files are coming through
  console.log("Request Body (Text Fields):", req.body); 
  console.log("Uploaded Files:", req.files); 

  // Get the fields from the form-data
  const { title, author, genre, summary, publicationDate } = req.body;

  let emptyFields = [];

  // Validate text fields
  if (!title) emptyFields.push('title');
  if (!author) emptyFields.push('author');
  if (!genre) emptyFields.push('genre');
  if (!summary) emptyFields.push('summary');
  if (!publicationDate) emptyFields.push('publicationDate');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  // Validate uploaded files (PDF and cover image)
  if (!req.files || !req.files.pdf || !req.files.cover) {
    return res.status(400).json({ error: 'Please upload a PDF and cover image' });
  }

  const pdfFile = req.files.pdf[0];
  const coverFile = req.files.cover[0];

  try {
    // Add book to the database (example)
    const book = await Book.create({
      title,
      author,
      genre,
      summary,
      publicationDate,
      pdf: pdfFile.buffer, // Store the PDF as a buffer
      cover: {
        data: coverFile.buffer, // Store the image as a buffer
        contentType: coverFile.mimetype, // Store the MIME type (e.g., 'image/jpeg')
      },
    });

    // Send the created book data as the response
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }
  try {
    const book = await Book.findOneAndDelete({ _id: id });

    if (!book) {
      return res.status(404).json({ error: 'No such book' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




const updateBook = async (req, res) => {
  const { id } = req.params;

  // Validate the provided book ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  try {
    // Initialize the updateData object with the request body
    const updateData = { ...req.body };

    // Check if required text fields are provided (optional in update)
    let emptyFields = [];
    const { title, author, genre, summary, publicationDate } = req.body;
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (genre) updateData.genre = genre;
    if (summary) updateData.summary = summary;
    if (publicationDate) updateData.publicationDate = publicationDate;

    // Check if any text field is missing (optional validation for update)
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all required fields', emptyFields });
    }

    // Handle file uploads (optional for update)
    if (req.files) {
      // Handle cover file (image)
      if (req.files.cover && req.files.cover[0]) {
        const coverFile = req.files.cover[0]; // Access the cover file
        updateData.cover = {
          data: coverFile.buffer, // Store the image as a buffer
          contentType: coverFile.mimetype, // Store the MIME type (e.g., 'image/jpeg')
        };
      }

      // Handle PDF file
      if (req.files.pdf && req.files.pdf[0]) {
        const pdfFile = req.files.pdf[0]; // Access the PDF file
        updateData.pdf = pdfFile.buffer; // Store the PDF file buffer
      }
    }

    // Update the book in the database
    const book = await Book.findOneAndUpdate(
      { _id: id }, // Find the book by ID
      updateData, // Update the book's data
      { new: true } // Return the updated document
    );

    // If no book found, return an error
    if (!book) {
      return res.status(404).json({ error: 'No such book' });
    }

    // Send the updated book data as the response
    res.status(200).json(book);
  } catch (error) {
    // Catch and log errors
    res.status(500).json({ error: error.message });
  }
};





const downloadBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  try {
    const book = await Book.findById(id);

    if (!book || !book.pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    // Sanitize book title to ensure it's a valid filename
    const sanitizedTitle = book.title.replace(/[^a-zA-Z0-9_\-\.]/g, '_'); // Replace any invalid characters

    // Set the content type as application/pdf for downloading
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.pdf"`);

    // Send the PDF buffer as the response
    res.send(book.pdf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







const getGenres = async (req, res) => {
  try {
    console.log("Request received for genres");  // Log to track the request
    const genres = await Book.distinct("genre");
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error retrieving genres:", error);
    res.status(500).json({ message: 'Error retrieving genres', error });
  }
};





const getLatestBooks = async (req, res) => {
  try {
    // Query to find the 9 most recently added books
    const books = await Book.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(9); // Limit the results to 9 books

    // Map through each book to transform the cover image into a Base64 string
    const booksWithCover = books.map(book => {
      const coverImage = book.cover
        ? `data:${book.cover.contentType};base64,${book.cover.data.toString('base64')}`
        : null;

      return {
        title: book.title,
        author: book.author,
        genre: book.genre,
        summary: book.summary,
        publicationDate: book.publicationDate,
        cover: coverImage, // Include the Base64-encoded cover
      };
    });

    // Respond with the latest book list including the Base64-encoded covers
    res.status(200).json(booksWithCover);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving latest books", error });
  }
};








module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
  downloadBook,
  getGenres,
  getLatestBooks
}