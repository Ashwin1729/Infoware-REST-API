const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Contact = sequelize.define("contact", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Contact;
