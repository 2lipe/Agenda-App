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

exports.editIndex = async function(req, res) {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.searchById(req.params.id);
    if (!contato) res.render('404');

    res.render('form-contato', { contato });

  } catch (err) {
    console.log(err);
    return res.render('404');
  }
  
};

exports.edit = async function(req, res) {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    const hasErrors = contato.errors.length > 0;

    if (hasErrors) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    const successMsg = 'Contato editado com sucesso.'

    req.flash('success', successMsg);
    req.session.save(() => res.redirect('/contato/'));

    return

  } catch (err) {
    console.log(err);
    return res.render('404');
  }
};

exports.delete = async function(req, res) {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render('404');
  
    const successMsg = 'Contato apagado com sucesso.'

    req.flash('success', successMsg);
    req.session.save(() => res.redirect('back'));
    return;

  } catch (err) {
    console.log(err)
    return res.render('404');
  }

};
