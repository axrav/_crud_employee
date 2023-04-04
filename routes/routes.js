const express = require('express');
const router = express.Router();

const { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/controllers');

router.post("/createEmployee", createEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployee/:id", getEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);


module.exports = router;