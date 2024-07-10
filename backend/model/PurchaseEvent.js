const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    event:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'event'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type : String,
        required : true
    },
    phoneno:{
        type : Number,
        required : true
    },
    quantity:{
        type : Number,
        required : true
    },
    date:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('purchase',purchaseSchema)