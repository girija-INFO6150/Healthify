const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Patient = require('../models/patient');
const Nutritionist = require('../models/nutritionist');
dotenv.config();


// validation 

router.post('/register', async (req, res) => {

    //CHECKING IF USER EXIST
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        const sendData={
            status:400,
            data: { err: "Email Exist" }
        }
        return res.status(400).json(sendData);}

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //REGISTERING THE DATA
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword
    })

    try {
        const saveuser = await user.save();
        if (user.role === 2) {
            const patient = new Patient({
                _id: user._id,
                name: user.name,
                email: user.email,
                height: 0,
                weight: 0,
                age: 0,
                sex: 0,
                daysExcercise: 0,
                foodAlargies: ''
            })
            try {
                const savepatient = await patient.save();
            } catch (error) {
                const sendData={
                    status:400,
                    data: { err: error }
                }
                res.status(400).json(sendData);
            }
            const sendData={
                status:200,
                data:{
                    user: user._id,
                    patient_id: patient._id
                }
            }
            return res.status(200).json(sendData);
        }
        if (user.role === 1) {
            const nutritionistSave = new Nutritionist({
                _id: user._id,
                name: user.name,
                email: user.email,
            })

            try {
                const savedata = await nutritionistSave.save()

            } catch (error) {
                const sendData={
                    status:400,
                    data: { err: error }
                }
                res.status(400).json(sendData);
            }
            const sendData={
                status:200,
                data:{
                    user: user._id,
                    nutrionist_id: nutritionistSave._id
                }
            }
            return res.status(200).json(sendData)
        }


    } catch (error) {
        const sendData={
            status:400,
            data: { err: error }
        }
        res.status(400).json(sendData);
    }
})

router.post('/login', async (req, res) => {
    //CHECKING IF USER EXIST
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const sendData = {
            status: 400,
            data: { err: "Email doesn't Exist" }
        }
        return res.status(400).json(sendData);
    }

    //checking for the password 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        const sendData = {
            status: 400,
            data: { err: "Invalid password" }
        }
        return res.status(400).json(sendData);
    }

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    var sendData = {
        status: 200,
        data: {
            name: user.name,
            role: user.role,
            _id: user._id,
            token: token
        }
    }
    res.header('auth-token', token).json(sendData);



})

module.exports = router;