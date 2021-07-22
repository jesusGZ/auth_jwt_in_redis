const route = require('express').Router();
const auth_middleware = require('../middlewares/auth.middleware');

route.get('/home', auth_middleware.verifyToken, (req, res) => {
    return res.json({status: true, message: "prueba de acceso"});
});

module.exports = route;