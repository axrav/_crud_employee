const { PrismaClient } = require('@prisma/client')
const moment = require('moment');
const prisma = new PrismaClient()

exports.createEmployee = async function (req, res) {
    try {
    const payload = req.body;
    console.log(payload);
    const employee = prisma.employee.create({
        data: payload
    });
    employee.then((data) => {
        return res.status(200).json(data);
    }
    ).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    }
    )
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

exports.getEmployees = function (req, res) {
    const employees = prisma.employee.findMany();
    employees.then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    )
}

exports.getEmployee = function (req, res) {
    const employee = prisma.employee.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });
    employee.then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    )
}

exports.updateEmployee = function (req, res) {
    const payload = req.body;
    if (!payload) {
        res.status(400).json({ message: 'Payload is required' });
    }

    const employee = prisma.employee.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: payload
    });
    employee.then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    )
}

exports.deleteEmployee = function (req, res) {
    const employee = prisma.employee.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    employee.then((data) => {
        res.status(200).json(data);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    )
}

