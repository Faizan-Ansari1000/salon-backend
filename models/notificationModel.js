const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
})

const userNoti = mongoose.model('UserNoti', notificationSchema);
module.exports = userNoti;