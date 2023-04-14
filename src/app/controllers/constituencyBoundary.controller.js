const {Constituency} = require('../models');

const createConstituency = async (req, res, next) => {
    try {
        const {
            ccId,
            coordinates,
            type,
        } = req.body;

        // check if constituency already exists
        const constituencyExists = await Constituency.exists({ ccId: ccId });
        if (constituencyExists) {
            return res.status(400).json({
                message: 'Constituency already exists',
            });
        }

        let constituency = await Constituency.create({
            ccId,
            coordinates,
            type,
        });

        res.status(201).json({
            status: true,
            message: 'Constituency created successfully',
            constituency,
        });
    } catch (error) {
        next(error);
    }
}

const fetchAllConstituencies = (req, res, next) => {
    try {
        const constituencies = Constituency.find().sort({createdAt: -1}).lean();

        res.status(200).json({
            status: true,
            message: 'Constituencies fetched successfully',
            constituencies,
        });
    } catch (error) {
        next(error);
    }
}

const updateConstituency = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Constituency.findByIdAndUpdate(
            {_id: id,}, {$set: req.body,}, {new: true,}
        );
        res.status(200).json({
            status: true,
            message: 'Constituency updated successfully',
        });
    } catch (e) {
        next(e);
    }
}

const deleteConstituency = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Constituency.findByIdAndDelete({_id: id,});
        res.status(200).json({
            status: true,
            message: 'Constituency deleted successfully',
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    createConstituency,
    fetchAllConstituencies,
    updateConstituency,
    deleteConstituency,
}