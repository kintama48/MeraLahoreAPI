const mongoose = require('mongoose');
const { Schema } = mongoose;

const FieldSchema = new Schema({
    label: { type: String, required: true },
    type: { type: String, enum: ['input', 'number', 'select', 'radio', 'email', 'date'], required: true },
    options: [{ type: String }],
    isRequired: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});

const FormBuilderSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    fields: [FieldSchema],
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('FormBuilder', FormBuilderSchema);