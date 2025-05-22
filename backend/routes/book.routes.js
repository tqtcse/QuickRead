const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.post('/', async (req, res) => {
  try {
    const { title, author, category_id, cover_url, description, rating, rating_count } = req.body;

    if (!title || !author || !category_id) {
      return res.status(400).json({ message: 'title, author và category_id là bắt buộc' });
    }

    const newBook = new Book({
      title,
      author,
      category_id,
      cover_url,
      description,
      rating: rating || 0,
      rating_count: rating_count || 0
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
