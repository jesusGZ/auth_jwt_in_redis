require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const version = process.env.VERSION

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`, {
      user: `${process.env.DB_USER}`, pass: `${process.env.DB_PASS}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

// middileware
app.use(express.json());

// routes
const auth_routes = require('./routes/auth.route');
const user_routes = require('./routes/user.route');


app.use(`/${version}/auth`, auth_routes);
app.use(`/${version}/user`, user_routes);

app.listen(process.env.PORT, () => console.log('El servidor esta corriendo..'));