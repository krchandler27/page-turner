const User = require("./user");
const Book = require("./book");
const Comment = require("./comment");

User.hasMany(Book, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Post has many comments, defining foreign key and onDelete method
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Book.hasMany(Comment, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

Book.belongsTo(User, {
  foreignKey: "user_id",
});

// Comment belongs to User, defining foreign key and onDelete method
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Book, {
  foreignKey: "book_id",
});

module.exports = {
  User,
  Comment,
  Book,
};
