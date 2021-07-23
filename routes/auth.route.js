const user_controller = require('../controllers/user.controller');
const auth_middleware = require('../middlewares/auth.middleware');

module.exports = (app) =>{

    app.post('/auth/register', user_controller.Register);
    app.post('/auth/login', user_controller.Login);
    app.post('/auth/token', auth_middleware.verifyRefreshToken, user_controller.GetAccessToken);
    app.get('/auth/logout', auth_middleware.verifyToken, user_controller.Logout);

}