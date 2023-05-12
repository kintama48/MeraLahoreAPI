const {Complaint, User} = require('../models');


const createComplaint = async (req, res, next) => {
    try {
        const {
            complainantName, description, telephone, email, img, status, ccId,
        } = req.body;

        // check if complaint already exists
        const complaintExists = await Complaint.exists({
            complainantName: complainantName,
            description: description,
            telephone: telephone,
            email: email,
            status: status,
            ccId: ccId
        });
        if (complaintExists) {
            return res.status(400).json({
                message: 'Complaint already exists',
            });
        }

        let complaint = await Complaint.create({
            complainantName, description, telephone, email, img, status, ccId,
        });

        res.status(201).json({
            status: true, message: 'Complaint created successfully', complaint,
        });
    } catch (error) {
        next(error);
    }
}

const fetchAllComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find().lean();

        res.status(200).json({
            status: true, message: 'Complaints fetched successfully', complaints,
        });
    } catch (error) {
        next(error);
    }
}

const updateComplaint = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Complaint.findByIdAndUpdate(
            {_id: id,}, {$set: req.body,}, {new: true,}
        );
        res.status(200).json({
            status: true, message: 'Complaint updated successfully',
        });
    } catch (e) {
        next(e);
    }
}

const deleteComplaint = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Complaint.findByIdAndDelete({_id: id,});
        res.status(200).json({
            status: true, message: 'Complaint deleted successfully',
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    createComplaint, fetchAllComplaints, updateComplaint, deleteComplaint,
}
