const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  thumbnail:{
    id: {type: String},
    name: {type: String},
    link: {type: String}
  },
  title: {
    type: String,
    default: "",
    required: true
  },
  content: {
    type: String,
    default: "",
    required: true
  },
  author: {
    type: String,
    default: "",
    required: true
  },
  dateCreated:{
    type: Date,
    default: Date.now
  },
  dateUpdated:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("blog", BlogSchema);