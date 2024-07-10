const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    sponser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sponser'
    },
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventStDate: {
        type: Date,
        required: true
    },
    eventEndDate: {
        type: Date,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    noOfTicket: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    soldTicket:{
        type : Number,
        default : 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
