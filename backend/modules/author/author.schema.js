const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const Author = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId && !this.githubId;
    }
  },
  googleId: { type: String },
  githubId: { type: String },
  avatar: {
    type: String,
    required: false,
    default: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg?w=360"
  },
  blogPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogPost",
    default: []
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    default: []
  }]
}, { timestamps: true, strict: true })

Author.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

Author.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate()
  if (update.password) {
    const salt = await bcrypt.genSalt(10)
    update.password = await bcrypt.hash(update.password, salt)
    this.setUpdate(update)
  }
})

module.exports = mongoose.model("author", Author, "authors")