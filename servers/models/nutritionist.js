const mongoose =require('mongoose');

const nutritionistSchema= new mongoose.Schema({
    _id:String,
    name :{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    patients:[{
        type:Object
    }],
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('nutritionist',nutritionistSchema)