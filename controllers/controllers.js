const jwt = require("jsonwebtoken");
const { html, sendEmail } = require("../helpers/email");
const { prisma } = require("../client/client");

exports.createEmployee = async function (req, res) {
  try {
    const payload = req.body;
    console.log(payload);
    const employee = prisma.employee.create({
      data: payload,
    });
    employee
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getEmployees = function (req, res) {
  try {
    const employees = prisma.employee.findMany();
    employees
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getEmployee = function (req, res) {
  try {
    const employee = prisma.employee.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    employee
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.updateEmployee = function (req, res) {
  try {
    const payload = req.body;
    if (!payload) {
      res.status(400).json({ message: "Payload is required" });
    }

    const employee_data = prisma.employee.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: payload,
    });
    employee
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.deleteEmployee = function (req, res) {
  try {
    const employee = prisma.employee.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    employee
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
exports.createAdmin = async function (req, res) {
  try {
    const payload = req.body;
    const admin = await prisma.admin.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phoneNumber,
      },
    });
    return res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getAdmins = async function (req, res) {
  try {
    const admins = await prisma.admin.findMany();
    return res.status(200).json(admins);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getAdmin = async function (req, res) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.updateAdmin = async function (req, res) {
  try {
    const { name, email, phoneNumber } = req.body;
    const admin = await prisma.admin.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: name,
        email: email,
        phone: phoneNumber,
      },
    });
    return res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.deleteAdmin = async function (req, res) {
  try {
    const admin = await prisma.admin.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.adminLogin = async function (req, res) {
  try {
    const { email } = req.body;
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const htmlData = html(otp);
    const mailOptions = {
      email: email,
      subject: "OTP for login",
      html: htmlData,
    };
    const sendMail = await sendEmail(mailOptions);
    if (!sendMail) {
      return res.status(500).json({ message: "Error sending OTP" });
    }
    const updateOtp = await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        otp: otp,
      },
    });
    if (!updateOtp) {
      return res.status(500).json({ message: "Error updating OTP" });
    }
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.verifyAdminOtp = async function (req, res) {
  try {
    const { email, otp } = req.body;
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.otp != otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.employeeLogin = async function (req, res) {
  try {
    const { email } = req.body;
    const employee = await prisma.employee.findUnique({
      where: {
        email: email,
      },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const htmlData = html(otp);
    const mailOptions = {
      email: email,
      subject: "OTP for login",
      html: htmlData,
    };
    const sendMail = await sendEmail(mailOptions);
    if (!sendMail) {
      return res.status(500).json({ message: "Error sending OTP" });
    }
    const updateOtp = await prisma.employee.update({
      where: {
        id: employee.id,
      },
      data: {
        otp: otp,
      },
    });
    if (!updateOtp) {
      return res.status(500).json({ message: "Error updating OTP" });
    }
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.verifyEmployeeOtp = async function (req, res) {
  try {
    const { email, otp } = req.body;
    const employee = await prisma.employee.findUnique({
      where: {
        email: email,
      },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (employee.otp != otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getEmployeeData = async function (req, res) {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(req.user.id),
      },
    });
    return res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
