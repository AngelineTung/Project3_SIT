const express = require('express'); 
const router = express.Router(); 
const { Tutorial } = require('../models');
const { Op } = require("sequelize");
const yup = require("yup");

router.post("/", async (req, res) => { 
    let data = req.body; 
    // Validate request body 
    let validationSchema = yup.object({ 
        Name: yup.string().trim().min(6).max(100).required(), 
        password: yup.string().trim().min(6).max(500).required(),
        address: yup.string().trim().min(6).max(500).required(),
        icnumber: yup.string().trim().min(9).max(500).required(),
        docemail: yup.string().trim().min(16).max(500).required(),
        medicalCondition: yup.string().trim().min(3).max(500).required(),
        nurseemail: yup.string().trim().min(3).max(500),
        caregivername: yup.string().trim().min(3).max(500),
        caregiveremail: yup.string().trim().min(6).max(500),
    }); 
    try { 
        data = await validationSchema.validate(data, { abortEarly: false }); 
        // Process valid data 
        let result = await Tutorial.create(data); 
        res.json(result); } 
    catch (err) { 
        res.status(400).json({ 
            errors: err.errors }); } 
        });

router.get("/", async (req, res) => { 
    let condition = {}; 
    let search = req.query.search; 
    if (search) { 
        condition[Op.or] = [ { 
            icnumber: { [Op.like]: `%${search}%` } }, { 
            docemail: { [Op.like]: `%${search}%` } } ]; 
        } 
        // You can add condition for other columns here // e.g. condition.columnName = value; 
        let list = await Tutorial.findAll({ 
            where: condition, order: [['createdAt', 'DESC']] 
        }); 
        res.json(list); 
    });

    router.get("/:id", async (req, res) => { 
        let id= req.params.id; 
        let tutorial = await Tutorial.findByPk(id); 
        // Check id not found 
        if (!tutorial) { 
            res.sendStatus(404); 
            return; 
        }
        res.json(tutorial); 
    });

    router.put("/:id", async (req, res) => {
        let id = req.params.id;
        // Check id not found
        let tutorial = await Tutorial.findByPk(id);
        if (!tutorial) {
            res.sendStatus(404);
            return;
        }
    
             
        let data = req.body;
        // Validate request body
        let validationSchema = yup.object({
            Name: yup.string().trim().min(6).max(100).required(), 
            password: yup.string().trim().min(6).max(500).required(),
            address: yup.string().trim().min(6).max(500).required(),
            icnumber: yup.string().trim().min(9).max(500).required(),
            docemail: yup.string().trim().min(16).max(500).required(),
            medicalCondition: yup.string().trim().min(3).max(500).required(),
            nurseemail: yup.string().trim().min(3).max(500),
            caregivername: yup.string().trim().min(3).max(500),
            caregiveremail: yup.string().trim().min(6).max(500),

        });
        try {
            data = await validationSchema.validate(data,
                { abortEarly: false });
    
            let num = await Tutorial.update(data, {
                where: { id: id }
            });
            if (num == 1) {
                res.json({
                    message: "Patient record was updated successfully."
                });
            }
            else {
                res.status(400).json({
                    message: `Cannot update tutorial with id ${id}.`
                });
            }
        }
        catch (err) {
            res.status(400).json({ errors: err.errors });
        }
    });


    router.delete("/:id", async (req, res) => { 
        let id = req.params.id; 
        let num = await Tutorial.destroy({ 
            where: { id: id } })
            if (num == 1) { 
                res.json({ 
                    message: "Patient was deleted successfully from system." 
                }); 
            } 
            else { 
                res.status(400).json({ 
                    message: `Cannot delete Patient with id ${id}.` 
                }); 
            } 
        
    });

module.exports = router;