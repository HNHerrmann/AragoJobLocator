const User = require("../models/User");
const session = require("express-session");



exports.borrarUsuario = function (req, res, next) {
  if (req.session.Admin) {
    const {userId} = req.body;
    User.deleteOne({_id: userId}, function (err, user) {
      if (user) {
        console.log(user)
        return res.redirect('back');
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

exports.getUsersNoParam = function (req,res,next) {
  User.find({}).sort('username').collation({ "locale": "es", "caseLevel": true, "strength":2 }).exec((err,users) => {
    console.log(users)
    return res.status(200).send(users);
  })
};

exports.getUsersParam= function (req,res,next){
  const { name } = req.body;

  User.find({username: new RegExp(name,'i')}).sort('username').collation({ "locale": "es", "caseLevel": true, "strength":2 }).exec((err,users) => {
    users.forEach(function(user, index,offers){
      console.log(user)
    });
    return res.status(200).send(users);
  })

  }