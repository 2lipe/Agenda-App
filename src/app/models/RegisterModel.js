const validator = require('validator');
const User = require('./User');

class Register {
  constructor(body) {
    this.body = body,
    this.errors = [],
    this.user = null;
  }

  async register() {
    this.isValid();
    await this.emailExists();

    const hasErrors = this.errors.length > 0;
    if (hasErrors) return;

    this.user = await User.create(this.body);

  }

  async emailExists() {
    try {
      this.user = await User.findOne({ email: this.body.email });
      if (this.user) this.errors.push('E-mail já cadastrado');
    } catch(err) {
      console.log(err);
    }
  }

  isValid() {
    this.cleanUp();

    const isNameValid = this.body.name.length > 0;
    const isEmailValid = validator.isEmail(this.body.email);
    const isPasswordValid = this.body.password.length > 3 && this.body.password.length <= 25;

    if (!isNameValid) this.errors.push('Nome inválido');
    if (!isEmailValid) this.errors.push('E-mail inválido');
    if (!isPasswordValid) this.errors.push('A senha precisa ter entre 3 e 25 caracteres');

  }

  cleanUp() {
    for (const key in this.body) {
      const isString = typeof this.body[key] === 'string';
      if (!isString) {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password
    }
  }

}

module.exports = Register;
