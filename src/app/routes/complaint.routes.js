const {
    createComplaint,
    fetchAllComplaints,
    deleteComplaint,
    updateComplaint,
} = require("../controllers/complaint.controller");

module.exports = app => {
    app.post('/complaints', createComplaint);
    app.get('/complaints', fetchAllComplaints);
    app.delete('/complaints/:id', deleteComplaint);
    app.put('/complaints/:id', updateComplaint);
}