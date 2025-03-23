const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date_time: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
})

const AppointMent = mongoose.model('Appointment', appointmentSchema);
module.exports = AppointMent;