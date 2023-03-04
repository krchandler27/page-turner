// Import dependencies
const router = require("express").Router();
const { Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

// Route for getting all comments for a post
router.get('/:id', (req, res) => {
  Comment.findAll({
    where: {
      book_id: req.params.id
    },
    include: {
      model: User,
      attributes: ['username']
    },
    order: [['createdAt', 'DESC']]
  })
    .then(dbCommentData => {
      res.json({ comments: dbCommentData });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route for creating a new comment
router.post("/:book_id/comment", withAuth, (req, res) => {
  Comment.create({ 
    comment_text: req.body.comment_text,
    book_id: req.params.book_id, 
    user_id: req.session.user_id 
  })
    .then(newComment => {
      console.log(newComment);
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Export the router
module.exports = router;