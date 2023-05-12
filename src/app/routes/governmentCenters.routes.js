const {
    createGovernmentCenter,
    fetchAllGovernmentCenters,
    deleteGovernmentCenter,
    updateGovernmentCenter,
    findGovernmentCenter
} = require("../controllers/governmentCenter.controller");

module.exports = app => {
    app.post('/centers', createGovernmentCenter);
    app.get('/centers', fetchAllGovernmentCenters);
    app.get('/centers/:id', findGovernmentCenter);
    app.delete('/centers/:id', deleteGovernmentCenter);
    app.put('/centers/:id', updateGovernmentCenter);
}