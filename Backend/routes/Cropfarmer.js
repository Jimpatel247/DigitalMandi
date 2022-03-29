const express = require('express');
const router = express.Router();
const fetchfarmer = require('../middleware/fetchfarmer');
const { body, validationResult } = require('express-validator');
const CropSchema = require('../models/CropSchema');

//Route 1: Adding crop as farmer  POST "/api/sell/farmer/addcrop"

router.post('/addcrop', fetchfarmer, [
    body('cropName', 'Enter a valid title').isLength({ min: 2 }),
    body('address', 'Address must be atleast 5 characters').isLength({ min: 5 }),
    body('market', 'Enter a valid market').isLength({ min: 2 }),
    body('weight', 'Enter a valid weight').isLength({ min: 1 }),], async (req, res) => {
        try {
            const { cropName, address, market, weight } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const crop = new CropSchema({
                cropName, address, market, weight, user: req.user.id
            })
            console.log("Crop detail recieved Successful");
            const savedNote = await crop.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


//Route 2: Adding crop as farmer  POST "/api/sell/farmer/current"
router.get('/current', fetchfarmer, async (req, res) => {
    try {
        const notes = await CropSchema.find({ user: req.user.id , flag : "false", price :{ $ne: 0 }});
        notes.sort((a, b) => {
            return b.price - a.price;
        });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Adding crop as farmer  POST "/api/sell/farmer/dashboard"

router.get('/dashboard', fetchfarmer, async (req, res) => {
    try {
        const crops = await CropSchema.find({ user: req.user.id , flag : "true"});
        res.json(crops)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 4: Adding crop as farmer  POST "/api/sell/farmer/confirm/:id"
//some logic still remaining

router.put('/confirm/:id',fetchfarmer, async(req,res) =>{
    try {
        let crop = await CropSchema.findById(req.params.id);
        if (!crop) { return res.status(404).send("Not Found") }
        if (crop.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        if(crop.flag === true){
            return res.status(208).json("Your crop is already sell");

        }
        console.log(crop);
        const newcrop= await CropSchema.findByIdAndUpdate(req.params.id,{flag:"true"});
       
        res.json("Your sell order is confirmed");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})



    module.exports = router