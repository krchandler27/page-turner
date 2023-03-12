// Import dependencies
const router = require("express").Router();
const { Comment } = require("../../models");
const authorize = require("../../utils/auth");

// Route for creating a new comment after being signed in to profile
router.post("/", authorize, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(202).json(newComment);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Update comment made by user when signed in
router.put("/:id", authorize, async (req, res) => {
  try {
    const findComment = await Comment.update(
      {
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!findComment) {
      res.status(404).json({ message: "🚫 Comment ID Not Found 🚫" });
      return;
    }
    res.status(202).json(findComment);
  } catch (err) {
    res.status(505).json(err);
  }
});

//Delete comment added by user
router.delete("/:id", authorize, async (req, res) => {
  try {
    const commentInfo = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentInfo) {
      res.status(404).json({
        message: "🚫 No matching comment ID 🚫",
      });
      return;
    }
    res.status(202).json(commentInfo);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Export the router
module.exports = router;
