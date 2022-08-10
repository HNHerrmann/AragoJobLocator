const User = require("../models/User");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


exports.getUser = function (req,res) {
      console.log(req.query)
      return res.status(200).send({});
};
