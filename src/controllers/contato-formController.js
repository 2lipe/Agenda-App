const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render('form-contato', {
    contato: {}
  });
};

exports.register = async(req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    const hasErrors = contato.errors.length > 0;
    if (hasErrors) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    const successMsg = 'Contato registrado com sucesso.';

    req.flash('success', successMsg);
    req.session.save(() => res.redirect(`/contato/`));
    return;

  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};