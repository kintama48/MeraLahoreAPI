const {
    createGovernmentCenter,
    fetchAllGovernmentCenters,
    deleteGovernmentCenter,
    updateGovernmentCenter
} = require("../controllers/governmentCenter.controller");

module.exports = app => {
    app.post('/centers', createGovernmentCenter);
    app.get('/centers', fetchAllGovernmentCenters);
    app.delete('/centers/:id', deleteGovernmentCenter);
    app.put('/centers/:id', updateGovernmentCenter);
}