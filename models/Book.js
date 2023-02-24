const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      book_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Author: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      genres: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );


module.exports = Book;