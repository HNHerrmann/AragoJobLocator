const User = require("../models/User");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


exports.saveFilters = function (req,res,next) {
  if (req.session.isAuth) {}
  const { filtros } = req.body;
  console.log(req.session.username);
  console.log(req)
  console.log(req.body);
  User.updateOne({username : req.session.username},{$set : {selfilters: req.body}} , function f(err,p) {
    if (err) {
      console.log(req.session.username)
      console.log(err)
      return res.status(400).send('mal');
    }
    else {console.log(req.session.username)
    return res.status(200).send({});
    }
  });
}
