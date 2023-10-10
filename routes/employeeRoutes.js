const express = require("express");
const {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeControllers");

const router = express.Router();

router.post("/employee", createEmployee);
router.get("/employees", listEmployees);
router.get("/employee/:id", getEmployee);
router.put("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);

module.exports = router;
