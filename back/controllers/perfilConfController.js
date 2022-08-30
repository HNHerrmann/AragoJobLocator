const User = require("../models/User");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


exports.saveFilters = function (req,res,next) {
  if (req.session.isAuth) {
    const {filtros} = req.body;
    console.log(req.session.username);
    console.log(req)
    console.log(req.body);
    User.updateOne({username: req.session.username}, {$set: {selfilters: req.body}}, function f(err, p) {
      if (err) {
        console.log(req.session.username)
        console.log(err)
        return res.status(400).send('mal');
      } else {
        console.log(req.session.username)
        return res.status(200).send({});
      }
    });
  }else{return res.status(400).send('mal');}
}

exports.saveCheckDate = function (req,res,next) {
  if (req.session.isAuth) {
    const {date} = req.body;
    console.log(req.body);
    User.updateOne({username: req.session.username}, {$set: {last_check: date}}, function f(err, p) {
      if (err) {
        console.log(req.session.username)
        console.log(err)
        return res.status(400).send('mal');
      } else {
        console.log(req.session.username)
        return res.status(200).send({});
      }
    });
  }else{return res.status(400).send('mal');}
}


exports.savePerfil = function (req,res,next) {
  if (req.session.isAuth) {
    const {perfil} = req.body;
    console.log(req.session.username);
    console.log(req)
    console.log(req.body);
    User.updateOne({username: req.session.username}, {$set: {perfil: req.body}}, function f(err, p) {
      if (err) {
        console.log(req.session.username)
        console.log(err)
        return res.status(400).send('mal');
      } else {
        console.log(req.session.username)
        return res.status(200).send({});
      }
    });
  }else{return res.status(400).send('mal');}
}

exports.myPerfil = function (req, res, next) {
  if (req.session.isAuth) {

    User.findOne({username: req.session.username}, function (err, user) {
      if (user) {
        console.log(user)
        return res.status(200).send({profile: user.perfil});
      }
    })
  }else{return res.status(400).send({length:0});}
};
