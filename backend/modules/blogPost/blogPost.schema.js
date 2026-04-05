const mongoose = require("mongoose")

const BlogPost = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  readTime: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author"
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    default: []
  }],
  content: {
    type: String,
    required: true
  }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("blogPost", BlogPost, "blogPosts")