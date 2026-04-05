const express = require("express")
const PORT = 4545
const cors = require("cors")
const startServer = require("./database/index")
const passport = require('passport')
const session = require('express-session')
const { initGithubPassport } = require('./modules/githubOauth/oauth.config')
const { initGooglePassport } = require('./modules/googleOauth/oauth.config')

// middleware imports
const errorHandler = require('./middlewares/errorHandler/errorHandler')

// routes imports
const authorRoute = require("./modules/author/author.route")
const blogPostRoute = require("./modules/blogPost/blogPost.route")
const commentRoute = require("./modules/comment/comment.route")
const authRoute = require("./modules/auth/auth.route")
const oauthGithubRoute = require('./modules/githubOauth/oauth.route')
const oauthGoogleRoute = require('./modules/googleOauth/oauth.route')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

// middlewares di passport
app.use(passport.initialize())
app.use(passport.session())
initGithubPassport()
initGooglePassport()

// routes
app.use("/", authorRoute)
app.use("/", blogPostRoute)
app.use("/", commentRoute)
app.use("/", authRoute)
app.use("/", oauthGithubRoute)
app.use("/", oauthGoogleRoute)

// error handler
app.use(errorHandler)

startServer(PORT, app)