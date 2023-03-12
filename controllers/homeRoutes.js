const router = require("express").Router();
const { Book, User, Comment } = require("../models");
const authorize = require("../utils/auth");

// Find all books and add User name
router.get("/", async (req, res) => {
  try {
    const bookInfo = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize or make the data easier to read
    const books = bookInfo.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Find all comments and add User name
router.get("/", async (req, res) => {
  try {
    const commentInfo = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize or make the data easier to read
    const comments = commentInfo.map((comment) => comment.get({ plain: true }));

    res.render("homepage", {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Get One book by ID along with comments
router.get("/books/:id", authorize, async (req, res) => {
  try {
    const bookInfo = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      // order: [[{ model: Comment}, "date_created", DESC]]
    });

    const book = bookInfo.get({ plain: true });

    const bookComments = bookInfo.comments.map((comment) =>
      comment.get({ plain: true })
    );

    res.render("book", {
      ...book,
      ...bookComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to create book
router.get("/profile/createBook", authorize, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Book }],
    });

    const user = userInfo.get({ plain: true });

    res.render("createBook", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update book using book id
router.get("/books/:id/updateBook", authorize, async (req, res) => {
  try {
    const findBook = await Book.findByPk(req.params.id);
    const book = findBook.get({ plain: true });

    res.render("updateBook", {
      book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to add comment
router.get("/books/:id/addComment", authorize, async (req, res) => {
  try {
    const bookInfo = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const book = bookInfo.get({ plain: true });

    res.render("addComment", {
      ...book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update comment by comment id
router.get("/comments/:id/updateComment", authorize, async (req, res) => {
  try {
    const findcomment = await Comment.findByPk(req.params.id);
    const comment = findcomment.get({ plain: true });

    res.render("updateComment", {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to view calendar
router.get("/profile/calendar", authorize, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Book }],
    });

    const user = userInfo.get({ plain: true });

    res.render("calendar", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to get profile information
router.get("/profile", authorize, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Book }, {model: Comment}],
    });

    const user = userInfo.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// After logging in go to profile page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
