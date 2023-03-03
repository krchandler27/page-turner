// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define Comment model by extending Model class
class Comment extends Model {}

// Initialize Comment model, specifying the attributes and their data types
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false // Set this column to not allow null values
    }
  },
  {
    sequelize // Connect to the database using the provided sequelize object
  }
);

// Export Comment model
module.exports = Comment;