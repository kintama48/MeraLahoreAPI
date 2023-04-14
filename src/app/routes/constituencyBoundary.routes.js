const {
    createConstituency,
    fetchAllConstituencies,
    updateConstituency,
    deleteConstituency
} = require('../controllers/constituencyBoundary.controller');

module.exports = app => {
    app.post('/constituencies', createConstituency);
    app.get('/constituencies', fetchAllConstituencies);
    app.delete('/constituencies/:id', deleteConstituency);
    app.put('/constituencies/:id', updateConstituency);
}