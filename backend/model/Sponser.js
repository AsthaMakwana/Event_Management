const mongoose = require("mongoose")

const sponserSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    sponserName:{
        type:String,
        required : true,
        unique:true
    },
    sponserLogo:{
        type : String
    },
    sponserDetail:{
        type : String,
    },
    date:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('sponser',sponserSchema)