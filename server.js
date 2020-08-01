const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');

const sessionOption = require('./src/database/index');
const routes = require('./routes');
const {
  msgMiddleware,
  checkCsrfError,
  csrfMiddleware
} = require('./src/app/middlewares/middlewares');

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(sessionOption);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'app', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

// Middlewares
app.use(msgMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('O servidor está sendo executado na porta 3000');
});
