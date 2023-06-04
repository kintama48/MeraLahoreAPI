const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
    complainantName: { type: String },
    description: { type: String, required: true},
    telephone: { type: String },
    email: { type: String },
    img: { type: String, required: true},
    status: { type: String, required: true, enum: ['pending', 'in-progress', 'resolved', 'rejected'], default: 'pending'},
    ccId: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Complaint', complaintSchema);
