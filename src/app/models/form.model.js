const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormValueSchema = new Schema({
    formId: { type: Schema.Types.ObjectId, ref: 'FormBuilder', required: true },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    values: [{ 
        label: String,
        value: Schema.Types.Mixed
    }]
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('FormValue', FormValueSchema);