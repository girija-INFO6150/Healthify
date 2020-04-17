const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/',verify,(req,res)=>{
    const sendData={
        status:200,
        data: "valid user"}
    res.status(200).json(sendData)
})



 

module.exports= router;