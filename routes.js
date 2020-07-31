const express = require('express');
const homeController = require('./src/controllers/homeController');
const registerController = require('./src/controllers/registerController');
const loginController = require('./src/controllers/loginController');

const route = express.Router();

// Rotas da home
route.get('/', homeController.index);

// Rotas de register
route.get('/register', registerController.index);
route.post('/register/register', registerController.register);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

module.exports = route;
