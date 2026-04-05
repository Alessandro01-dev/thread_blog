const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const oauthService = require("./oauth.service")

const initGooglePassport = () => {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GO_CLIENT_ID,
      clientSecret: process.env.GO_CLIENT_SECRET,
      callbackURL: process.env.GO_CB_URL
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await oauthService.findOrCreateSocialUser(profile, 'google');
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    })
  )
}

module.exports = { initGooglePassport }