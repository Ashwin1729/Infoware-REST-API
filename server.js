const express = require("express");

const dotenv = require("dotenv");
const sequelize = require("./config/database");

const Employee = require("./models/employeeModel");
const Contact = require("./models/contactModel");

const server = express();
dotenv.config();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API is running successfuly");
});

Employee.hasMany(Contact, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Contact.belongsTo(Employee);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then((result) => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
