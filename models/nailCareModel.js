const mongoose = require('mongoose');

const nailSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    },
})

const NailCare = mongoose.model('NailCare', nailSchema);
module.exports = NailCare;