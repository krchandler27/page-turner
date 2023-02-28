const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new book
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      book_name: req.body.book_name,
      Author: req.body.Author,
      description: req.body.description,
      genres: req.body.genres,
      image: req.body.image,
      user_id: req.session.user_id
    });
    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a book
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBook = await Book.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!updatedBook[0]) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a book
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedBook = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!deletedBook) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }
    res.status(200).json(deletedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;