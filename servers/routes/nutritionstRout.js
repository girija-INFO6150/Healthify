const router = require('express').Router();
const Nutritionist = require('../models/nutritionist');
const Patient = require('../models/patient')


router.get('/getDocotor', async(req,res)=>{
    const doctorList = await Nutritionist.find();
    if (!doctorList) {
        const dataSend = {
            status: 400,
            data: {
                err: "no nutitionist Exits"
            }
        }
        return res.status(400).json(dataSend);
    }

    const sendDoctorList=[];
    doctorList.forEach((dat)=>{
        const doc= {
            "name":dat.name,
            "doctor_id":dat._id
        }
        sendDoctorList.push(doc);
    })

    const sendData={
        status:200,
        data:{
            doctorList:sendDoctorList
        }
    }

    return res.status(200).json(sendData);

})
router.post('/addpatient', async (req, res) => {
    const nutritioninstExists = await Nutritionist.findOne({ _id: req.body.doctor_id });
    if (!nutritioninstExists) {
        const dataSend = {
            status: 400,
            data: {
                err: "nutitionist Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }
    const patientExists = await Patient.findOne({ _id: req.body.patients[0].user_id });
    if (!patientExists) {
        const dataSend = {
            status: 400,
            data: {
                err: "Patient Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }

    const patientnew = [];
    if (nutritioninstExists.patients != undefined && nutritioninstExists.patients.length != 0) {
        nutritioninstExists.patients.forEach(data => {
            patientnew.push(data);
        }
        );
        patientnew.push(req.body.patients[0]);
    }
    else {
        patientnew.push(req.body.patients[0]);
    }

    try {
        const NutritionistPatient = await Nutritionist.updateOne({ _id: req.body.doctor_id }, {
            $set: {
                patients: patientnew,
            }
        });
        const updatednutritioninst = await Nutritionist.findOne({ _id: req.body.doctor_id });
        const updatePatient= await Patient.updateOne({_id:req.body.patients[0].user_id },{
            $set:{
                doctorAttached:true
            }
        })
        const sendData = {
            status: 200,
            data: {
                patients: updatednutritioninst.patients
            }
        }

        return res.status(200).json(sendData);

    } catch (error) {
        const sendData = {
            status: 400,
            data: {
                message: err
            }
        }

        return res.sendStatus(400).json(sendData);

    }

})


router.get('/getpatient/:doctor_id',async(req,res)=>{
    console.log('params',req.params.doctor_id)
    const nutritioninstExists = await Nutritionist.findOne({ _id: req.params.doctor_id});
    if (!nutritioninstExists) {
        const dataSend = {
            status: 400,
            data: {
                err: "nutitionist Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }

    const sendData = {
        status: 200,
        data: {
            patients: nutritioninstExists.patients
        }
    }

    return res.status(200).json(sendData);

})

module.exports = router;