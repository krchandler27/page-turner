const router = require("express").Router();
const { Book } = require("../../models");
const authorize = require("../../utils/auth");

// Post/create new book after being signed in to profile
router.post("/", authorize, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(202).json(newBook);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Update book created by user from profile
router.put("/:id", authorize, async (req, res, next) => {
  try {
    const findBook = await Book.update(
      {
        book_name: req.body.book_name,
        author: req.body.author,
        description: req.body.description,
        genres: req.body.genres,
        image: req.body.image,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!findBook) {
      res.status(404).json({ message: "🚫 Could not Update Book 🚫" });
      return;
    }
    res.status(202).json(findBook);
  } catch (err) {
    res.status(505).json(err);
  }
});

// Delete book created by user
router.delete("/:id", authorize, async (req, res) => {
  try {
    const bookInfo = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bookInfo) {
      res.status(404).json({
        message: "🚫 No matching book ID 🚫",
      });
      return;
    }
    res.status(202).json(bookInfo);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
