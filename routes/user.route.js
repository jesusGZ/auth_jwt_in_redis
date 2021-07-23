
const auth_middleware = require('../middlewares/auth.middleware');

module.exports = (app) =>{
app.get('/user/home', auth_middleware.verifyToken, (req, res) => {
    return res.json({status: true, message: "prueba de acceso"});
});
}