const {
    createRepresentative,
    fetchAllRepresentatives,
    deleteRepresentative,
    updateRepresentative,
} = require('../controllers/representative.controller');

module.exports = app => {
    app.post('/representatives', createRepresentative);
    app.get('/representatives', fetchAllRepresentatives);
    app.delete('/representatives/:id', deleteRepresentative);
    app.put('/representatives/:id', updateRepresentative);
}