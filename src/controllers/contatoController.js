const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  try {
    const contatos = await Contato.findContact();
    res.render('contato', { contatos });

  } catch (err) {
    console.log(err);
    res.render('404');
  }

}
