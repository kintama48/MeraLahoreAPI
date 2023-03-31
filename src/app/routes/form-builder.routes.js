module.exports = app => {
    const {
        createFormBuilder,
        fetchFormByApplicationId,
    } = require('../controllers/form-builder.controller');

    app.post('/form-builders', createFormBuilder);
    app.get('/form-builders/:applicationId', fetchFormByApplicationId);
}