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
    const { page = 1, limit = 10 } = req.query;
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

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contacts = null } = req.body;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found!" });
    }

    employee.name = name;
    await employee.save();

    let updatedEmployee = { ...employee.dataValues };

    if (contacts && contacts.length > 0) {
      const response = await Contact.destroy({
        where: {
          employeeId: id,
        },
      });

      const createdContacts = await Contact.bulkCreate(
        contacts.map((contact) => ({
          ...contact,
          employeeId: id,
        }))
      );

      updatedEmployee = {
        ...employee.dataValues,
        contacts: createdContacts,
      };
    }

    res.status(201).json(updatedEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found!" });
    }

    await employee.destroy();

    res.status(200).json({ message: "Employee deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id, {
      include: [{ model: Contact }],
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found!" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEmployee,
  listEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
