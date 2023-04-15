const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
    complaintId: { type: String, required: true, },
    complainantName: { type: String, required: true, },
    title: { type: String, required: true, },
    description: { type: String},
    telephone: { type: String, required: true, },
    email: { type: String, required: true, },
    img: { type: String},
    status: { type: String, required: true, enum: ['pending', 'in-progress', 'resolved', 'rejected'], default: 'pending'},
    ccId: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Complaint', complaintSchema);