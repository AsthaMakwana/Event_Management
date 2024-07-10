const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    categoryname :{
        type : String,
        require : true,
        unique:true
    },
    categorydescription :{
        type : String,
    },
    date:{
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('category',categorySchema)