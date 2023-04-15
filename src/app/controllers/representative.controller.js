const { Representative } = require('../models');

const createRepresentative = async (req, res, next) => {
    try {
        const {
            name,
            address,
            telephone,
            ccId,
            picResId
        } = req.body;

        console.log(req.body);

        // check if representative already exists
        // const representativeE = await Representative.exists({ name: name, ccId: ccId });
        // if (representativeE) {
        //     return res.status(400).json({
        //         message: 'Representative already exists',
        //     });
        // }

        const representative = await Representative.create({
            name,
            picResId,
            address,
            telephone,
            ccId,
        });

        res.status(201).json({
            status: true,
            message: 'Representative created successfully',
            representative,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const fetchAllRepresentatives = (req, res, next) => {
    try {
        const representatives = Representative.find().sort({ createdAt: -1 }).lean();

        res.status(200).json({
            status: true,
            message: 'Representatives fetched successfully',
            representatives,
        });
    } catch (error) {
        next(error);
    }
}

const updateRepresentative = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Representative.findByIdAndUpdate(
            { _id: id, }, { $set: req.body, }, { new: true, }
        );
        res.status(200).json({
            status: true,
            message: 'Representative updated successfully',
        });
    } catch (e) {
        next(e);
    }
}

const deleteRepresentative = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Representative.findByIdAndDelete({ _id: id, });
        res.status(200).json({
            status: true,
            message: 'Representative deleted successfully',
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    createRepresentative,
    fetchAllRepresentatives,
    updateRepresentative,
    deleteRepresentative,
}