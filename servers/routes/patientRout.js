const router = require('express').Router();
const User = require('../models/user');
const Patient = require('../models/patient')

router.post('/deleteCom',async (req,res)=>{
    const patientExists = await Patient.findOne({ _id: req.body.user_id });
    if (!patientExists) {
        console.log("not found");
        const dataSend = {
            status: 400,
            data: {
                err: "Patient Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }
try {
    const updatePatient= await Patient.updateOne({ _id: req.body.user_id },{
        $set:{comments:req.body.comment}
    })
    const updatedata = await Patient.findOne({ _id: req.body.user_id });
        const sendData = {
            status: 200,
            data: {
                comment: updatedata.comments
            }
        }

        res.json(sendData);
    
} catch (error) {
    const sendData = {
        status: 400,
        data: {
            message: err
        }
    }

    res.sendStatus(400).json(sendData);

    
}
    

    

})


router.get('/getall',async(req,res)=>{
     const allPatient =await Patient.find({doctorAttached:false});
     if (!allPatient) {
        console.log("not found");
        const dataSend = {
            status: 400,
            data: {
                err: "no patient is there"
            }
        }
        return res.status(400).json(dataSend);
    }
    const patientList=[]
    allPatient.forEach(pat =>{
        const patientdata={
            "patientName":pat.name,
            "user_id":pat._id
        }
        patientList.push(patientdata);
    })

    const sendData={
        status:200,
        data:{
            allpatientList:patientList
        }
    }

    return res.status(200).json(sendData);
})

router.get('/getpatient/:user_id', async (req, res) => {
    const patientExists = await Patient.findOne({ _id: req.params.user_id });
    if (!patientExists) {
        console.log("not found");
        const dataSend = {
            status: 400,
            data: {
                err: "Patient Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }
    const sendData = {
        status: 200,
        data: {
            _id: patientExists._id,
            name: patientExists.name,
            email: patientExists.email,
            age: patientExists.age,
            sex: patientExists.sex,
            height: patientExists.height,
            weight: patientExists.weight,
            daysExercise: patientExists.daysExcercise,
            foodHabit: patientExists.foodHabit,
            foodAlargies: patientExists.foodAlargies
        }
    }

    return res.status(200).json(sendData);
})



router.put('/updatepatient', async (req, res) => {
    const patientExists = await Patient.findOne({ _id: req.body._id });
    if (!patientExists) {
        const dataSend = {
            status: 400,
            data: {
                err: "Patient Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }


    try {

        const updatePatient = await Patient.updateOne({ _id: req.body._id }, {
            $set: {
                height: req.body.height,
                weight: req.body.weight,
                age: req.body.age,
                sex: req.body.sex,
                daysExcercise: req.body.daysExcercise,
                foodAlargies: req.body.foodAlargies
            }
        });

        const sendData = {
            status: 200,
            data: {
                message: "your Data is updated"
            }
        }

        return res.status(200).json(sendData);

    } catch (err) {
        const sendData = {
            status: 400,
            data: {
                message: err
            }
        }

        res.sendStatus(400).json(sendData);

    }


})



router.get('/getcomment/:user_id', async (req, res) => {
    const patientExists = await Patient.findOne({ _id: req.params.user_id });
    if (!patientExists) {
        const dataSend = {
            status: 400,
            data: {
                err: "Patient Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }
    const sendData= {
        status:200,
        data:{
            comments:patientExists.comments
        }
    }
    return res.status(200).json(sendData);


})

router.post('/commentUpdate', async (req, res) => {
    const patientExists = await Patient.findOne({ _id: req.body._id });
    if (!patientExists) {
        const dataSend = {
            status: 400,
            data: {
                err: "Patient Does't Exits"
            }
        }
        return res.status(400).json(dataSend);
    }
    const commentnew = [];
    if (patientExists.comments != undefined && patientExists.comments.length != 0) {
        patientExists.comments.forEach(data => {
            commentnew.push(data);
        }
        );
        commentnew.push(req.body.comment[0]);
    }
    else {
        commentnew.push(req.body.comment[0]);
    }
    try {
        const updatePatient = await Patient.updateOne({ _id: req.body._id }, {
            $set: {
                comments: commentnew,
            }
        });
        const updatedata = await Patient.findOne({ _id: req.body._id });
        const sendData = {
            status: 200,
            data: {
                comment: updatedata.comments
            }
        }

        res.json(sendData);

    } catch (err) {
        const sendData = {
            status: 400,
            data: {
                message: err
            }
        }

        return res.sendStatus(400).json(sendData);
    }
})



module.exports = router;