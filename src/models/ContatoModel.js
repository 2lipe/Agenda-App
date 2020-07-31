const Contact = require('./Contato');
const validator = require('validator');

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.isValid();
    const hasErrors = this.errors.length > 0
    if (hasErrors) return;

    this.contato = await Contact.create(this.body);
  }

  static async findContact() {
    const contatos = await Contact.find().sort({ created_at: -1 });
    return contatos;
  };

  async searchById(id) {
    if (typeof id !== 'string') return;
    const contato = await Contact.findById(id);
    return contato;
  };

  async edit(id) {
    if (typeof id !== 'string') return;
    this.isValid();
    const hasErrors = this.errors.length > 0;
    if (hasErrors) return;

    this.contato = await Contact.findByIdAndUpdate(id, this.body, { new: true });
  };

  async delete(id) {
    if (typeof id !== 'string') return;
    const contato = await Contact.findOneAndDelete({ _id: id });
    return contato;
  }

  isValid() {
    this.cleanUp();

    const isEmailValid = validator.isEmail(this.body.email);
    if (this.body.email && !isEmailValid) this.errors.push('E-mail inválido.');
    if (!this.body.name) this.errors.push('Nome é obrigatório.');
    if (!this.body.email && !this.body.telephone) {
      this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone');
    }
  };

  cleanUp() {
    for (const key in this.body) {
      const isString = typeof this.body[key] === 'string';
      if (!isString) {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      last_name: this.body.last_name,
      email: this.body.email,
      telephone: this.body.telephone,
    };
  };

};

module.exports = Contato;
