const mongoose = require('mongoose');
const { Schema } = mongoose;

const RepresentativesSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    address: {type: String},
    telephone: {type: String},
    role: { type: String, required: true, enum: ['NA', 'PP', 'UC']},
    ccId: { type: Schema.Types.ObjectId, ref: 'ConstituencyBoundary', required: true },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Representative', RepresentativesSchema);