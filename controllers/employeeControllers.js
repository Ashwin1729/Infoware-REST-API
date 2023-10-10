const Contact = require("../models/contactModel");
const Employee = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  try {
    const { name, contacts } = req.body;
    const newEmployee = await Employee.create({ name });

    let createdEmployee = { ...newEmployee.dataValues };

    if (contacts && contacts.length > 0) {
      const createdContacts = await Contact.bulkCreate(
        contacts.map((contact) => ({
          ...contact,
          employeeId: newEmployee.id,
        }))
      );

      createdEmployee = {
        ...newEmployee.dataValues,
        contacts: createdContacts,
      };
    }

    res.status(201).json(createdEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listEmployees = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const employees = await Employee.findAndCountAll({
      offset,
      limit: parseInt(limit),
      include: [{ model: Contact }],
    });

    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {};

const deleteEmployee = async (req, res) => {};

const getEmployee = async (req, res) => {};

module.exports = {
  createEmployee,
  listEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
