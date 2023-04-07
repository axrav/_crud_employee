const express = require("express");
const employee = express.Router();
const admin = express.Router();
const router = express.Router();
const { adminAuth, employeeAuth } = require("../middleware/middleware");
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  adminLogin,
  employeeLogin,
  verifyAdminOtp,
  verifyEmployeeOtp,
  getEmployeeData,
} = require("../controllers/controllers");

// Admin Protected Routes
admin.post("/createEmployee", createEmployee);
admin.get("/getEmployees", getEmployees);
admin.get("/getEmployee/:id", getEmployee);
admin.put("/updateEmployee/:id", updateEmployee);
admin.delete("/deleteEmployee/:id", deleteEmployee);

// Admin Routes
admin.post("/createAdmin", createAdmin);
admin.get("/getAdmins", getAdmins);
admin.get("/getAdmin/:id", getAdmin);
admin.put("/updateAdmin/:id", updateAdmin);
admin.delete("/deleteAdmin/:id", deleteAdmin);

// Login Routes
router.post("/adminLogin", adminLogin);
router.post("/employeeLogin", employeeLogin);

// Verify Routes
router.post("/verifyAdmin", verifyAdminOtp);
router.post("/verifyEmployee", verifyEmployeeOtp);

employee.get("/getData", getEmployeeData);

router.use("/admin", adminAuth, admin);
router.use("/employee", employeeAuth, employee);

module.exports = router;
