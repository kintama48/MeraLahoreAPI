const { Application, FormBuilder, } = require('../models');

const createApplication = async (req, res, next) => {
    try {
        const {
            applicationName,
            applicationId,
        } = req.body;

        // check if application already exists
        const app = await Application.exists({ applicationId });
        if (app) {
            return res.status(400).json({
                message: 'Application already exists',
            });
        }

        const application = await Application.create({
            applicationName,
            applicationId,
        });

        res.status(201).json({
            status: true,
            message: 'Application created successfully',
            application,
        });

    } catch (error) {
        next(error);
    }
}

const fetchAllApplications = async (req, res, next) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({
            status: true,
            message: 'Applications fetched successfully',
            applications,
        });
    } catch (error) {
        next(error);
    }
}


const updateApplications = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Application.findByIdAndUpdate({
            _id: id,
        }, {
            $set: req.body,
        }, {
            new: true,
        });
        res.status(200).json({
            status: true,
            message: 'Application updated successfully',
        });

    } catch (error) {
        next(error);
    }
}

const deleteApplication = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log(id);

        await Application.findByIdAndDelete({
            _id: id,
        });

        await FormBuilder.findByIdAndDelete({
            _id: id,
        })

        res.status(200).json({
            status: true,
            message: 'Application deleted successfully',
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createApplication,
    fetchAllApplications,
    updateApplications,
    deleteApplication,
}