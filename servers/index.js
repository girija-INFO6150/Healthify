const express = require('express');
const app = express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const cors = require('cors');
//const bodyParser= require('body-parser');
dotenv.config();
// importing the auth part
const authrout= require('./routes/auth');
const postRout= require('./routes/post');
const patientRout=require('./routes/patientRout');
const nutrionistRout= require('./routes/nutritionstRout');

app.use(cors());


//Db connection
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },            
()=>{console.log('connected to DB')},);



//middleware
app.get('/',(req,res)=>{
    return res.json({"name":"shams"})
})

//app.use(bodyParser());
app.use(express.json());
app.use('/api/user', authrout);
app.use('/api/verify',postRout);
app.use('/api/patient',patientRout);
app.use('/api/nutritionist',nutrionistRout);

app.listen(5000,()=>{console.log('the appilcation is running');});