const { Complaint } = require("../models");
const chalk = require("chalk");
require("dotenv").config();

const fetchComplaintsByCCID = async (req, res, next) => {
  try {
    let ccId = req.params.id.toUpperCase();
    const ccExists = await Complaint.exists({ ccId: ccId });

    if (!ccExists) {
      return res.status(404).json({
        message: "CCID not found",
      });
    }

    const totalComplaints = await Complaint.countDocuments({ ccId: ccId });
    const pendingComplaints = await Complaint.countDocuments({
      ccId: ccId,
      status: "pending",
    });
    const resolvedComplaints = await Complaint.countDocuments({
      ccId: ccId,
      status: "resolved",
    });
    const inProgressComplaints = await Complaint.countDocuments({
      ccId: ccId,
      status: "in-progress",
    });

    const complaints = await Complaint.find({ ccId: ccId }).lean();

    res.status(200).json({
      status: true,
      message: "Complaints fetched successfully",
      ccId: ccId,
      totalComplaints: totalComplaints,
      pendingComplaints: pendingComplaints,
      resolvedComplaints: resolvedComplaints,
      inProgressComplaints: inProgressComplaints,
      complaints: complaints,
    });
  } catch (e) {
    next(e);
  }
};

const createComplaint = async (req, res, next) => {
  try {
    let { complainantName, description, telephone, email, img, status, ccId } =
      req.body;

    if (img.includes("?")) {
      img = img.split("?")[0];
    }

    // check if complaint already exists
    const complaintExists = await Complaint.exists({
      description: description,
      img: img,
      status: status,
      ccId: ccId,
    });
    if (complaintExists) {
      return res.status(400).json({
        message: "Complaint already exists",
      });
    }

    const complaint = await Complaint.create({
      complainantName,
      description,
      telephone,
      email,
      img,
      status,
      ccId,
    });

    res.status(201).json({
      status: true,
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    next(error);
  }
};

const fetchAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().lean();

    res.status(200).json({
      status: true,
      message: "Complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    next(error);
  }
};

const updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Complaint updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

const deleteComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: true,
      message: "Complaint deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createComplaint,
  fetchAllComplaints,
  updateComplaint,
  deleteComplaint,
  fetchComplaintsByCCID,
};
