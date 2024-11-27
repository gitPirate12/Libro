const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    pdf: {
      type: Buffer,
      required: true,
    },
    cover: {
      data: {
        type: Buffer,
        required: true, // Ensures the image data is provided
      },
      contentType: {
        type: String,
        required: true, // Ensures the MIME type is provided
      },
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
