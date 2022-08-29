const bcrypt = require("bcryptjs");
const User = require("../models/User");


exports.islogged = function (req, res, next )  {
  if (req.session.isAuth) {
    if(req.session.Admin){
      return res.status(200).send({message: "AdminRight"});
    }
    return res.status(200).send({message: "Logueado"});
  } else {
    return res.status(200).send({message: "Nainonain"});
  }

}

exports.login = function (req, res, next )  {
  const { username, password } = req.body;

  User.findOne({ username },function (err,user) {
    if (!user) {
      return res.status(400).send("Usuario no existe");
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Pass erronea");
    }
    else {
      if(user.admin){req.session.Admin = true;}
    req.session.isAuth = true;
    req.session.username = user.username;
    return res.status(200).send({message: "Logueado"});
    }
  });
};

exports.logout = function (req, res, next )  {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not log out.');
    } else {
      res.status(200).send({});
    }
  });
};
