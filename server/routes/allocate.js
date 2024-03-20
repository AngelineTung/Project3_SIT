const express = require('express');
const router = express.Router();
const { User} = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

router.post("/allocate-nurse", validateToken, async (req, res) => {
    let data = req.body;
    data.userId = req.user.id;

    // Validate request body
    const allocationSchema = yup.object({
        nurseName: yup.string().required(),
        timeSlot: yup.string().required(),
        patientName: yup.string().required(),
    });

    try {
        const { nurseName, timeSlot, patientName } = await allocationSchema.validate(req.body);

        // Create Nurse and Doctor instances (assuming predefined nurses and doctors)
        const nurse = nurseName === 'Nurse A' ? nurse1 : nurse2;
        const doctor = nurse.specialization === 'Surgery' ? doctor1 : doctor2;

        // Allocate nurse
        doctor.allocateNurse(nurse, timeSlot, patientName);

        res.status(200).json({ message: 'Nurse allocation successful.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

module.exports = router;