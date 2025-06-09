'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A user must have a first name.',
        },
        notEmpty: {
          msg: 'Please provide a first name.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A user must have a last name.',
        },
        notEmpty: {
          msg: 'Please provide a last name.',
        },
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email address you entered already exists.',
      },
      validate: {
        notNull: {
          msg: 'A user must have an email address.',
        },
        isEmail: {
          msg: 'Please enter a valid email address.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
   
        if (val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'A user must have a password.',
        },
        notEmpty: {
          msg: 'Please enter a password.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return User;
};
