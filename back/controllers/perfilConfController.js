const User = require("../models/User");


exports.saveFilters = function (req,res,next) {
  const { filtros } = req.body;
  console.log(req.session.username);
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
