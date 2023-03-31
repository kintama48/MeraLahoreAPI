module.exports = app => {
    const { 
        createApplication,
        fetchAllApplications,
        deleteApplication,
        updateApplications,
    } = require('../controllers/application.controller');

    app.post('/applications', createApplication);
    app.get('/applications', fetchAllApplications);
    app.delete('/applications/:id', deleteApplication);
    app.put('/applications/:id', updateApplications);
}