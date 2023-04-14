const mongoose = require('mongoose');
const { Schema } = mongoose;

const governmentCentersSchema = new Schema({
    centerName: { type: String, required: true, },
    latitude: { type: String, required: true, },
    longitude: { type: String, required: true, },
    telephone: { type: String, required: true, },
    type: { type: String, required: true, },
    ccId: { type: Number, required: true, },

}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('GovernmentCenter', governmentCentersSchema);