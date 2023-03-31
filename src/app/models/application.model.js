const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    applicationName: { type: String, required: true, },
    applicationId: { type: String, required: true, },

}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Application', applicationSchema);