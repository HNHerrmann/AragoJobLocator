const User = require("../models/User");
const session = require("express-session");



exports.borrarUsuario = function (req, res, next) {
  if (req.session.Admin) {
    const {userId} = req.body;
    User.deleteOne({_id: userId}, function (err, user) {
      if (user) {
        console.log(user)
        return res.status(200).send({message: "deleted"});
      }
    })
  }
  else return res.status(403);



};

exports.userByName = function (req, res, next) {

  const {username} = req.body;

  User.findOne({username: username}, function (err, user) {
    if (user) {
      console.log(user)
      return res.status(200).send({id:user._id.toString()});
    }
  })
};
