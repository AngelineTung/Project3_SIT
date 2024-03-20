const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();


router.post("/register", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().max(50).required('Name is required').matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
        email: yup.string().trim().lowercase().email('Email must be a valid Email').max(50).required('Email is required'),
        fullPassword: yup.string().trim().min(8, 'Password must be atleast 8 characters').max(50, 'Password must be atmost 50 characters').required('Password is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Password must contain at least 1 letter and 1 number"),
        role: yup.string().trim().required('Role is required').oneOf(['Admin', 'Doctor', 'Nurse', 'Patient', 'Caregiver'], "Role must be one of: Admin, Doctor, Nurse, Patient, Caregiver"),
        address: yup.string().trim().max(500).required('Address is required'),
        icnumber: yup.string().trim().max(50).required('NRIC is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Nric must contain at least 1 letter and 1 number"),
        caregivername: yup.string().trim().max(50).required().matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
        caregiveremail: yup.string().trim().lowercase().email('Caregiver Email must be a valid Email').max(50).required('Caregiver Email is required'),
        medicalCondition: yup.string().trim().max(500).required('Medical Condition is required'),
        docemail: yup.string().trim().lowercase().email('Doctor Email must be a valid Email').max(50).required('Doctor Email is required'),
        nurseemail: yup.string().trim().lowercase().email('Nurse Email must be a valid Email').max(50).required('Nurse Email is required'),

    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        // Check email
        let user = await User.findOne({
            where: { email: data.email }
        });
        if (user) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }

        // Hash passowrd
        data.fullPassword = await bcrypt.hash(data.fullPassword, 10);
        // Create user
        let result = await User.create(data);
        res.json({
            message: `Email ${result.email} was registered successfully.`
        });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.post("/login", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        email: yup.string().trim().lowercase().email().max(50).required(),
        fullPassword: yup.string().trim().min(8).max(50).required().matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
            "password at least 1 letter and 1 number")
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        // Check email and password
        let errorMsg = "Email or password is not correct.";
        let user = await User.findOne({
            where: { email: data.email }
        });
        if (!user) {
            res.status(400).json({ message: errorMsg });
            return;
        }
        let match = await bcrypt.compare(data.fullPassword, user.fullPassword);
        if (!match) {
            res.status(400).json({ message: errorMsg });
            return;
        }

        // Return user info
        let userInfo = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        let accessToken = sign(userInfo, process.env.APP_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN });
        res.json({
            accessToken: accessToken,
            user: userInfo
        });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }
});

router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    };
    res.json({
        user: userInfo
    });
});

router.get("/users", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [{
            icnumber: { [Op.like]: `%${search}%` }
        }, {
            docemail: { [Op.like]: `%${search}%` }
        }];
    }
    // You can add condition for other columns here // e.g. condition.columnName = value; 
    let list = await User.findAll({
        where: condition, order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let user = await User.findByPk(id);
    // Check id not found 
    if (!user) {
        res.sendStatus(404);
        return;
    }
    res.json(user);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let user = await User.findByPk(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }


    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        name: yup.string().trim().max(50).required('Name is required').matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
        email: yup.string().trim().lowercase().email('Email must be a valid Email').max(50).required('Email is required'),
        fullPassword: yup.string().trim().min(8, 'Password must be atleast 8 characters').max(50, 'Password must be atmost 50 characters').required('Password is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Password must contain at least 1 letter and 1 number"),
        role: yup.string().trim().required('Role is required').oneOf(['Admin', 'Doctor', 'Nurse', 'Patient', 'Caregiver'], "Role must be one of: Admin, Doctor, Nurse, Patient, Caregiver"),
        address: yup.string().trim().max(500).required('Address is required'),
        icnumber: yup.string().trim().max(50).required('NRIC is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Nric must contain at least 1 letter and 1 number"),
        caregivername: yup.string().trim().max(50).required().matches(/^[a-zA-Z '-,.]+$/, "Name only allow letters, spaces and characters: ' - , ."),
        caregiveremail: yup.string().trim().lowercase().email('Caregiver Email must be a valid Email').max(50).required('Caregiver Email is required'),
        medicalCondition: yup.string().trim().max(500).required('Medical Condition is required'),
        docemail: yup.string().trim().lowercase().email('Doctor Email must be a valid Email').max(50).required('Doctor Email is required'),
        nurseemail: yup.string().trim().lowercase().email('Nurse Email must be a valid Email').max(50).required('Nurse Email is required'),

    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });

        let num = await User.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "User record was updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update User with id ${id}.`
            });
        }
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await User.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "User was deleted successfully from system."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete User with id ${id}.`
        });
    }

});

module.exports = router;