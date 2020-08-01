const express = require('express');
const homeController = require('./src/app/controllers/homeController');
const registerController = require('./src/app/controllers/registerController');
const loginController = require('./src/app/controllers/loginController');
const loggedController = require('./src/app/controllers/loggedController');
const contatoController = require('./src/app/controllers/contatoController');
const contatoFormController = require('./src/app/controllers/contato-formController');

const { loginRequired } = require('./src/app/middlewares/middlewares');

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
route.get('/form-contato/index/:id', loginRequired, contatoFormController.editIndex);
route.post('/form-contato/edit/:id', loginRequired, contatoFormController.edit);
route.get('/form-contato/delete/:id', loginRequired, contatoFormController.delete);

module.exports = route;
