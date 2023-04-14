const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConstituencyBoundaries = new Schema({
    ccId: { type: String, required: true, },
    coordinates: { type: Array, required: true, },
    type: { type: String, required: true, enum: ['NA', 'PP', 'UC']},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('ConstituencyBoundary', ConstituencyBoundaries);