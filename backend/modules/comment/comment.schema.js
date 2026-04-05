const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogPost"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author"
  }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("comment", Comment, "comments")