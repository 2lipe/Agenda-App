const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if (req.session.user) return res.render('logged');
  return res.render('login');
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.auth();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('back');
      });
      return;
    }

    const successMsg = 'Login efetuado com sucesso.';

    req.flash('success', successMsg);
    req.session.user = login.user;
    req.session.token = login.token;
    req.session.save(() => {
      return res.redirect('back');
    });

  } catch(err) {
    console.log(err);
    return res.render('404');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
