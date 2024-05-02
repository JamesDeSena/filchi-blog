const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  userName: {
    type: String,
    default: "",
    required: true
  },
  passWord: {
    type: String,
    default: "",
    required: true
  },
});

module.exports = mongoose.model("admin", AdminSchema);