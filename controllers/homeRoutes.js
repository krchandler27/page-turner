const router = require("express").Router();
const { Book, User } = require("../models");
const authorize = require("../utils/auth");

// Find all books and add User name
router.get("/", async (req, res) => {
    try {
        const bookInfo = await Book.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }
            ]
        });

        // Serialize or make the data easier to read
        const books = bookInfo.map((book) => book.get({plain: true}));

        res.render("homepage", {
            books,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(505).json(err);
    }
});

// Find book by unique ID
router.get("/books/:id", authorize, async (req, res) => {
    try {
        const bookInfo = await Book.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ["name"]
            }]
        });
        const book = bookInfo.get({plain: true});

        res.render("book", {
            ...book,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(505).json(err);
    }
});

// Must be logged in to create book
router.get("/createBook", authorize, async (req, res) => {
    try {
        const userInfo = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ["password"]},
            include: [{model: Book}]
        });

        const user = userInfo.get({plain: true});

        res.render("createBook", {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(505).json(err);
    }
});

// Must be logged in to get profile information
router.get("/profile", authorize, async (req, res) => {
    try {
        const userInfo = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ["password"]},
            include: [{model: Book}]
        });

        const user = userInfo.get({plain: true});

        res.render("profile", {
            ...user,
            logged_in: true
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
