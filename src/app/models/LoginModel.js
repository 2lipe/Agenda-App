const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');

const authConfig = require('../../config/auth.json');

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.token = null;
  }

  async auth() {
    this.cleanUp();
    const hasErrors = this.errors.length > 0;

    if (hasErrors) return;

    this.user = await User.findOne({ email: this.body.email }).select('+password');
    if(!this.user) {
      this.errors.push('Email inválido.');
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }

    this.user.password = undefined;

    const oneDay = 86400
    const token = jwt.sign({ id: this.user._id }, authConfig.secret, {
      expiresIn: oneDay,
    });
  
    this.token = token;

  }

  cleanUp() {
    for (const key in this.body) {
      const isString = typeof this.body[key] === 'string';
      if (!isString) {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    }
  }

}

module.exports = Login;
