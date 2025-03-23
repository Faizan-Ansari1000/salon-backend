const mongoose = require('mongoose');

const doubtSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String
    },
    askAdmin: {
        type: String,
        required: true
    },
})

const Doubt = mongoose.model('Doubt', doubtSchema);
module.exports = Doubt;