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

const findGovernmentCenters = async (req, res, next) => {
  try {
    const { id } = req.params;  // NA-134, PP-23, UC-12
    const [type, code] = id.split('-');

    let ppId = null;
    let ucId = null;
    let naId = null;

    switch (type.toLowerCase()) {
        case 'pp':
            ppId = code;
            break;
        case 'uc':
            ucId = code;
            break;
        case 'na':
            naId = code;
            break;
    }

    const governmentCenters = await GovernmentCenter.find({
      $or: { "ccId.ppId": ppId }, { "ccId.ucId": ucId }, { "ccId.naId": naId },
    });

    if (governmentCenters.length === 0) {
      return res.status(404).json({
        message: 'Government centers not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'Government centers found',
      governmentCenters,
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
    findGovernmentCenters
}
