const mongoose = require('mongoose');
const { Schema } = mongoose;

const RepresentativesSchema = new Schema({
    name: { type: String, required: true },
    address: {type: String},
    telephone: {type: String},
    ccid: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Representative', RepresentativesSchema);