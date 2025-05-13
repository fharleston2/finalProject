const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('State', stateSchema);
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;