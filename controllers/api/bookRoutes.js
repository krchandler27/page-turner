const router = require("express").Router();
const bodyParser = require("body-parser");
const { Book, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get single book by ID, with associated comments and user data
router.get("/:book_id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.book_id, {
      include: [
        { model: Comment, include: [{ model: User }] },
        { model: User },
      ],
    });

    if (!bookData) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }

    const book = bookData.get({ plain: true });

    res.render("book", {
      ...book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// Add comment to book
router.post("/:book_id/comment", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      book_id: req.params.book_id,
      user_id: req.session.user_id,
    });
    console.log(newComment);

    res.redirect(`/books/${req.params.book_id}`);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Get all books with associated user data
router.get("/", async (req, res) => {
  try {
    const booksData = await Book.findAll({ include: [{ model: User }] });
    const books = booksData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;