const express = require('express');
const homeController = require('./src/controllers/homeController');
const registerController = require('./src/controllers/registerController');
const loginController = require('./src/controllers/loginController');
const loggedController = require('./src/controllers/loggedController');
const contatoController = require('./src/controllers/contatoController');
const contatoFormController = require('./src/controllers/contato-formController');

const { loginRequired } = require('./src/middlewares/middlewares');

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

// Rotas de contato
route.get('/logged', loginRequired, loggedController.index);
route.get('/contato', loginRequired, contatoController.index);
route.get('/form-contato', loginRequired, contatoFormController.index);
route.post('/form-contato/register', loginRequired, contatoFormController.register);

module.exports = route;
