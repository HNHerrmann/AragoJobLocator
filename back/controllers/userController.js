const User = require("../models/User");


exports.userByName = function (req, res, next) {

  const {username} = req.body;

  User.findOne({username: username}, function (err, user) {
    if (user) {
      console.log(user)
      return res.status(200).send({id:user._id.toString()});
    }
  })
};
