const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = function (req, res, next) {

  const {username, email, password} = req.body;

  User.findOne({username: username}, function (err, user) {

    if (user) {
      return res.status(400).send("Ya existe");
    }

    const hasdPsw = bcrypt.hashSync(password, 12)


      let newuser = new User({
        username: username,
        email: email,
        password: hasdPsw,
        admin: false,
      });


      User.create(newuser, function (err) {
        if (err) {
          return res.status(400).send("Algo ha ido mal");
        }
        return res.status(200).send({message: "Chachi"});
      })
    })
};
