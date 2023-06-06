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
  app.get("/complaints/cc/:id", fetchComplaintsByCCID);
  app.get("/complaints/cc", fetchComplaintsByConstituencies);
  app.post("/complaints", createComplaint);

  app.get("/complaint/:id", fetchComplaintById);
  app.delete("/complaint/:id", deleteComplaint);
  app.patch("/complaint/:id", updateComplaint);
};
