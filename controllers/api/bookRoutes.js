const router = require("express").Router();
const { Book } = require("../../models");
const authorize = require("../../utils/auth");

// Post new book after being signed in to profile
router.post("/", authorize, async (req, res) => {
    try {
        console.log(req.body)

        const newBook = await Book.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(202).json(newBook);
    } catch (err) {
        res.status(404).json(err);
    }
});

router.delete("/:id", authorize, async (req, res) => {
    try {
        const bookInfo = await Book.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!bookInfo) {
            res.status(404).json({
                message: "No matching book ID 🚫"
            });
            return;
        }
        res.status(202).json(bookInfo);
    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router;