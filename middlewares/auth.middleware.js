const jwt = require('jsonwebtoken');
const redis_client = require('../models/conexion/redis_connection');


function verifyToken(req, res, next) {
    try {
        // Bearer tokenstring
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.userData = decoded;

        req.token = token;

        // varifica el token en la lista negra.
        redis_client.get('BL_' + decoded.sub.toString(), (err, data) => {
            if(err) throw err;

            if(data === token) return res.status(401).json({status: false, message: "token en la lista negra."});
            next();
        })
    } catch (error) {
        return res.status(401).json({status: false, message: "Tu sesión no es válida.", data: error});
    }
}

function verifyRefreshToken(req, res, next) {
    const token = req.body.token;

    if(token === null) return res.status(401).json({status: false, message: "Solicitud no válida."});
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        req.userData = decoded;

        // verificar si el token está en la tienda o no
        redis_client.get(decoded.sub.toString(), (err, data) => {
            if(err) throw err;

            if(data === null) return res.status(401).json({status: false, message: "Solicitud no válida. El token no está en la tienda."});
            if(JSON.parse(data).token != token) return res.status(401).json({status: false, message: "Solicitud no válida. El token no es el mismo en la tienda."});

            next();
        })
    } catch (error) {
        return res.status(401).json({status: true, message: "Tu sesión no es válida.", data: error});
    }
}

module.exports = {
    verifyToken,
    verifyRefreshToken
}