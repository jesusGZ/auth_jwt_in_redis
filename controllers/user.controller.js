const User = require('../models/schemas/user.schema');
const jwt = require('jsonwebtoken');
const redis_client = require('../redis_connection');
const Config = require("../models/constants/config");
const config = new Config();
const Response = require('../models/constants/response');
const response = new Response();
const db = require("../models/connection");
const DB = new db();

async function Register(req, res){

    DB.connect(config.mongo());

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const saved_user = await user.save();
        DB.disconnect()
        response.success(saved_user, 'Usuario registrado con exito.')
    } catch (error) {
        DB.disconnect()
        response.progress(error)
    }
}

async function Login (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        DB.connect(config.mongo());

        const user = await User.findOne({username: username, password: password}).exec();
        
        if(user === null) response.processValidation('credenciales incorrectas.')
        
        console.log('user', user);
        const access_token = jwt.sign({sub: user._id}, config.jwt().access_key, { expiresIn: config.jwt().access_time });
        
        console.log('access_token', access_token);
        const refresh_token = GenerateRefreshToken(user._id);

        DB.disconnect()
        response.success({access_token, refresh_token}, 'Inicio de sesion exitoso.')

    } catch (error) {
        DB.disconnect()
        response.process(error, 'Fallo el inicio de sesion.')
    }
}

async function Logout (req, res) {
    const user_id = req.userData.sub;
    const token = req.token;

    // Se elimina refresh token
    await redis_client.del(user_id.toString());

    // token de acceso actual en lista negra
    await redis_client.set('BL_' + user_id.toString(), token);
    
    response.success()
}

function GetAccessToken (req, res) {
    const user_id = req.userData.sub;
    const access_token = jwt.sign({sub: user_id}, config.jwt().access_key, { expiresIn: config.jwt().access_time });
    const refresh_token = GenerateRefreshToken(user_id);
    return res.json({status: true, message: "success", data: {access_token, refresh_token}});
}

function GenerateRefreshToken(user_id) {
    const refresh_token = jwt.sign({ sub: user_id }, config.jwt().refresh_key, { expiresIn: config.jwt().refresh_time });
    
    redis_client.get(user_id.toString(), (err, data) => {
        if(err) throw err;

        redis_client.set(user_id.toString(), JSON.stringify({token: refresh_token}));
    })

    return refresh_token;
}

module.exports = {
    Register,
    Login,
    Logout,
    GetAccessToken
}