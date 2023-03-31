module.exports = app => {
    const {
        createUser,
        loginUsers,
    } = require('../controllers/user.controller');

    app.post('/user', createUser);
    app.post('/user/login', loginUsers);
}