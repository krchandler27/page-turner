/* const User = require('./User');
const Book = require('./Book');

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Book }; */

const User = require('./User');
const Book = require('./Book');
const Comment = require('./comment');

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Post has many comments, defining foreign key and onDelete method
User.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

// Comment belongs to User, defining foreign key and onDelete method
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Book
};