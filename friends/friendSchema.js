const mongoose = require('mongoose');

const definition = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    }
}

const options = {
    timestamps: true
}

const friendSchema = new mongoose.Schema(definition, options);

module.exports = mongoose.model('Friend', friendSchema);