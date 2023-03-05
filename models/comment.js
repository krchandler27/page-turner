// Import required modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define Comment model by extending Model class
class Comment extends Model {}

// Initialize Comment model, specifying the attributes and their data types
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false, // Set this column to not allow null values
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "book",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize, // Connect to the database using the provided sequelize object
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "comment",
  }
);

// Export Comment model
module.exports = Comment;
