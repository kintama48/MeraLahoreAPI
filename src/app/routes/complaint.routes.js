const {
  createComplaint,
  fetchAllComplaints,
  deleteComplaint,
  updateComplaint,
  fetchComplaintsByCCID,
  fetchComplaintsByConstituencies,
  fetchComplaintById,
} = require("../controllers/complaint.controller");

module.exports = (app) => {
  app.get("/complaints", fetchAllComplaints);
  app.post("/complaints/cc/:id", fetchComplaintsByCCID);
  app.get("/complaints/cc", fetchComplaintsByConstituencies);

  app.get("/complaint/:id", fetchComplaintById);
  app.delete("/complaint/:id", deleteComplaint);
  app.put("/complaint/:id", updateComplaint);
  app.post("/complaint", createComplaint);
};
