// jwt middleware

const jwt = require("jsonwebtoken");

const prisma = require("../client/client").prisma;

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ error: "Please authenticate" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await prisma.admin.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
       return res.status(401).send({ error: "Please authenticate as admin" });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate" });
  }
};

const employeeAuth = async (req, res, next) => {
  try {
      const token = req.header("Authorization").replace("Bearer ", "");
      if (!token) {
          return res.status(401).send({ error: "Please authenticate" });
      }
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.employee.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
        return res.status(401).send({ error: "Please authenticate as employee" });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = {
  adminAuth,
  employeeAuth,
};
