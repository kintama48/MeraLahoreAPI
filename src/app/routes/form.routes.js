module.exports = app => {
    const {
        createForm,
        getFormByApplicationId,
        getFormByFormId,
    } = require('../controllers/form.controller');

    app.post('/forms', createForm);
    app.get('/forms/:formId', getFormByFormId);
    app.get('/forms/application/:applicationId', getFormByApplicationId);
}