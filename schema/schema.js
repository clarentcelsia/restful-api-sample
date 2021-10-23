// JSON Schema

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('schema', schema);
