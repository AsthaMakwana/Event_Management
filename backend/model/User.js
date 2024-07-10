const mongoose =  require('mongoose')
const validator = require("validator")

const userSchema = mongoose.Schema({

    fname:{
        type : String,
        required : true,
    },
    lname:{
        type:String,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
    },
    contactno:{
        type : Number,
        unique : true,
        required : true,
    },
    gender:{
        type : String
    },
    image:{
        // data: Buffer ,
        // contentType: String
        type:String
    },
    country:{
        type : String,
    },
    detail:{
        type:String
    },
    role:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user',userSchema)