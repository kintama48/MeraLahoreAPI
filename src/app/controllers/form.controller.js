const { Form } = require('../models');


const createForm = async (req, res, next) => {
    try {
        const {
            applicationId,
            formId,
            values,
        } = req.body;

        const valueArray = Object.entries(values).map(([label, value]) => ({ label, value }));

        console.log(valueArray);

        const form = await Form.create({
            applicationId,
            formId,
            values: valueArray,
        });

        res.status(201).json({
            status: true,
            message: 'Form created successfully',
            form,
        });

    } catch (error) {
        next(error);
    }
}

// get by Formid
const getFormByFormId = async (req, res, next) => {
    try {
        const { formId } = req.params;
        const form = await Form.find({
            formId,
        })
        .sort({
            createdAt: -1,
        })
        .lean();

        res.status(200).json({
            status: true,
            message: 'Form fetched successfully',
            form,
        });

    } catch (error) {
        next(error);
    }
};

// get by applicationId
const getFormByApplicationId = async (req, res, next) => {
    try {
        const { applicationId } = req.params;
        const form = await Form.find({
            applicationId,
        })
        .sort({
            createdAt: -1,
        })
        .lean();

        res.status(200).json({
            status: true,
            message: 'Form fetched successfully',
            form,
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createForm,
    getFormByFormId,
    getFormByApplicationId,
};