const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  selfilters: [{
    type: String,
  }],
  last_check: {
    type:Date,
  },
  perfil: {
    type:JSON,
  }
});

module.exports = mongoose.model("User", userSchema);
