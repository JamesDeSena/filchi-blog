const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  thumbnail:{
    id: {type: String},
    name: {type: String},
    link: {type: String}
  },
  imageCaption: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
    required: true
  },
  titleDesc: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
    required: true
  },
  author: {
    type: String,
    default: "",
  },
  tags: {
    type: String,
    default: "",
    required: true
  },
  tier: {
    type: String,
    default: ""
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