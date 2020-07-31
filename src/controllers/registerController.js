const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
  res.render('register');

};

exports.register = async (req, res) => {
  try {
    const registry = new Register(req.body);
    await registry.register();

    if (registry.errors.length > 0) {
      req.flash('errors', registry.errors);
      req.session.save(() => {
        return res.redirect('back');
      })
      return;
    }

    const successMsg = 'Seu cadastrado foi efetuado com sucesso.';

    req.flash('success', successMsg);
    req.session.save(() => {
      return res.redirect('back');
    })

  } catch(err) {
    console.log(err);
    return res.render('404');
  }

};
