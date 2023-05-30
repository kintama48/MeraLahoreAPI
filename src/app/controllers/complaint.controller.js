const { Complaint } = require("../models");
const { Pool } = require("pg");
const chalk = require("chalk");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB_DB,
  // schema: 'public',
  // url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_DB}?schema=public`,
});

pool.connect().then(() => {
  console.log(`%s Connected to postgres`, chalk.green("✓"));
  // pool.query(
  //   "CREATE TABLE IF NOT EXISTS Complaint (id VARCHAR(255) PRIMARY KEY NOT NULL, complainantName VARCHAR(255), description VARCHAR(255) NOT NULL, telephone VARCHAR(255), email VARCHAR(255), img VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, ccId VARCHAR(255) NOT NULL, createdAt TIMESTAMP, updatedAt TIMESTAMP);"
  // );
});

const createComplaint = async (req, res, next) => {
  try {
    const {
      complainantName,
      description,
      telephone,
      email,
      img,
      status,
      ccId,
    } = req.body;

    // check if complaint already exists
    const complaintExists = await Complaint.exists({
      complainantName: complainantName,
      description: description,
      telephone: telephone,
      email: email,
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

    // add complaint to postgres
    pool.query(
      `INSERT INTO "Complaint" ("complainantName", description, telephone, email, img, status, "ccId",
                                      "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        complaint.complainantName,
        complaint.description,
        complaint.telephone,
        complaint.email,
        complaint.img,
        complaint.status,
        complaint.ccId,
        complaint.createdAt,
        complaint.updatedAt,
      ]
    );
  } catch (error) {
    next(error);
  }
};

const fetchAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().lean();

    complaints.map((complaint) => {
      // add complaint to postgres
      pool.query(
        `INSERT INTO "Complaint" ("complainantName", description, telephone, email, img, status, "ccId",
                                          "createdAt", "updatedAt")
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING`,
        [
          complaint.complainantName,
          complaint.description,
          complaint.telephone,
          complaint.email,
          complaint.img,
          complaint.status,
          complaint.ccId,
          complaint.createdAt,
          complaint.updatedAt,
        ]
      );
    });

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
};
