const express = require('express')
const oauth = express.Router()
const passport = require('passport')
const oauthController = require('./oauth.controller')

oauth.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
oauth.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), oauthController.manageOauthCallback);

module.exports = oauth