const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

dotenv.config();

mongoose.connect(
  process.env.CONNECTION_STRING, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to Database');
}).catch(err => {
  console.log(err);
});

mongoose.Promise = global.Promise;

const cookieAge = 1000 * 60 * 60 * 24 * 7;
const sessionOption = session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: cookieAge,
    httpOnly: true
  }
});

module.exports = mongoose;
module.exports = sessionOption;
