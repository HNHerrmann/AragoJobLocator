const User = require("../models/User");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


exports.getUser = function (req,res, next) {
  const {userId} = req.body;

  User.findOne({_id: userId}, function (err, user) {
    if (user) {
      console.log(user)
      return res.status(200).send({perfil:user.perfil,filtros:user.selfilters});
    }else{return res.status(200).send({length:0})}
  })
};

