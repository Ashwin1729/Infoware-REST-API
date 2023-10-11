const express = require("express");
const {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeControllers");

const router = express.Router();

router.post("/create-employee", createEmployee);
router.get("/list-employees", listEmployees);
router.get("/get-employee/:id", getEmployee);
router.put("/update-employee/:id", updateEmployee);
router.delete("/delete-employee/:id", deleteEmployee);

module.exports = router;
