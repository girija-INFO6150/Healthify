const mongoose =require('mongoose');

const patientSchema= new mongoose.Schema({
    _id:String,
    name :{
        type:String,    
    },
    email:{
        type:String,
    },
    age:{
        type:Number
    },
    sex:{
        type:Number
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    },
    daysExcercise:{
        type:Number,
    },
    foodHabit:{
        type: Number,
    },
    foodAlargies:{
        type:String,
    },
    comments:[
        {
            type:String
        }
    ],
    doctorAttached:{
        type:Boolean,
        default:false,
    },
    createdon:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Patient',patientSchema)