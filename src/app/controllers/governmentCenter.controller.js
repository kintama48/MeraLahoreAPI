const {GovernmentCenter} = require('../models');


const createGovernmentCenter = async (req, res, next) => {
    try {
        const {
            centerName,
            latitude,
            longitude,
            telephone,
            type,
            ccId,
        } = req.body;

        // check if government center already exists
        const governmentCenterE = await GovernmentCenter.exists({centerName: centerName, ccId: ccId});
        if (governmentCenterE) {
            return res.status(400).json({
                message: 'Government center already exists',
            });
        }

        const governmentCenter = await GovernmentCenter.create({
            centerName,
            latitude,
            longitude,
            telephone,
            type,
            ccId,
        });

        res.status(201).json({
            status: true,
            message: 'Government center created successfully',
            governmentCenter,
        });

    } catch (error) {
        next(error);
    }
}

const fetchAllGovernmentCenters = (req, res, next) => {
    try {
        const representatives = GovernmentCenter.find().sort({createdAt: -1}).lean();

        res.status(200).json({
            status: true,
            message: 'GovernmentCenters fetched successfully',
            representatives,
        });
    } catch (error) {
        next(error);
    }
}

const updateGovernmentCenter = async (req, res, next) => {
    try {
        const {id} = req.params;
        await GovernmentCenter.findByIdAndUpdate(
            {_id: id,}, {$set: req.body,}, {new: true,}
        );
        res.status(200).json({
            status: true,
            message: 'GovernmentCenter updated successfully',
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
            status: true,
            message: 'GovernmentCenter deleted successfully',
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    createGovernmentCenter,
    fetchAllGovernmentCenters,
    updateGovernmentCenter,
    deleteGovernmentCenter,
}