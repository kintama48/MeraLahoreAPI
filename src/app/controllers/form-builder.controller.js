const { FormBuilder, Application, } = require('../models');


const createFormBuilder = async (req, res, next) => {
    try {
        const {
            title,
            description,
            fields,
            applicationId,
            isRequired,
        } = req.body;

        // check if application exists
        const application = await Application.exists({ _id: applicationId });
        if (!application) {
            return res.status(400).json({
                status: false,
                message: 'Application does not exist',
            });
        }

        // check if form already exists
        const form = await FormBuilder.exists({ applicationId });

        if (form) {
            return res.status(400).json({
                status: false,
                message: 'Form already exists',
            });
        }

        const formBuilder = await FormBuilder.create({
            title,
            description,
            fields,
            applicationId,
            isRequired,
        });

        res.status(201).json({
            status: true,
            message: 'Form created successfully',
            formBuilder,
        });


    } catch (error) {
        console.log(error);
        next(error);
    }
}

const fetchFormByApplicationId = async (req, res, next) => {
    try {
        const { applicationId } = req.params;

        const form = await FormBuilder.find({ applicationId }).sort({ createdAt: -1 }).lean();

        res.status(200).json({
            status: true,
            message: 'Form fetched successfully',
            form,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createFormBuilder,
    fetchFormByApplicationId,
};