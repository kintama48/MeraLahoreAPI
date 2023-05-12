const {GovernmentCenter} = require('../models');


const createGovernmentCenter = async (req, res, next) => {
    try {
        const {
            centerName, latitude, longitude, telephone, type, ccId,
        } = req.body;

        // check if government center already exists
        const governmentCenterE = await GovernmentCenter.exists({centerName: centerName, ccId: ccId});
        if (governmentCenterE) {
            return res.status(400).json({
                message: 'Government center already exists',
            });
        }

        const governmentCenter = await GovernmentCenter.create({
            centerName, latitude, longitude, telephone, type, ccId,
        });

        res.status(201).json({
            status: true, message: 'Government center created successfully', governmentCenter,
        });

    } catch (error) {
        next(error);
    }
}

const fetchAllGovernmentCenters = async (req, res, next) => {
    try {
        const representatives = await GovernmentCenter.find().lean();

        res.status(200).json({
            status: true, message: 'GovernmentCenters fetched successfully', representatives,
        });
    } catch (error) {
        next(error);
    }
}

const updateGovernmentCenter = async (req, res, next) => {
    try {
        const {id} = req.params;
        await GovernmentCenter.findByIdAndUpdate({_id: id,}, {$set: req.body,}, {new: true,});
        res.status(200).json({
            status: true, message: 'GovernmentCenter updated successfully',
        });
    } catch (e) {
        next(e);
    }
}

const deleteGovernmentCenter = async (req, res, next) => {
    try {
        const {id} = req.params;
        await GovernmentCenter.findByIdAndDelete({_id: id,});
        res.status(200).json({
            status: true, message: 'GovernmentCenter deleted successfully',
        });
    } catch (e) {
        next(e);
    }
}

const findGovernmentCenter = async (req, res, next) => {
    try {
        const {
            ppId, ucId, naId,
        } = req.params;

        const governmentCenter = await GovernmentCenter.findOne({
            $or: [{ppId: ppId}, {ucId: ucId}, {naId: naId},],
        });

        if (!governmentCenter) {
            return res.status(404).json({
                message: 'Government center not found',
            });
        }

        res.status(200).json({
            status: true, message: 'Government center found', governmentCenter,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createGovernmentCenter,
    fetchAllGovernmentCenters,
    updateGovernmentCenter,
    deleteGovernmentCenter,
    findGovernmentCenter
}
