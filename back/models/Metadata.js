const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Meta", metaSchema);
