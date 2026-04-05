const passport = require('passport')
const GithubStrategy = require('passport-github2').Strategy
const oauthService = require("./oauth.service")

const initGithubPassport = () => {

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(
    new GithubStrategy({
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      callbackURL: process.env.GH_CB_URL,
      scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          const response = await fetch('https://api.github.com/user/emails', {
            headers: { 'Authorization': `token ${accessToken}` }
          });
          const emails = await response.json();
          const primaryEmail = emails.find(e => e.primary) || emails[0];
          profile.emails = [{ value: primaryEmail.email }];
        }

        const user = await oauthService.findOrCreateSocialUser(profile, 'github');
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    })
  );
}

module.exports = {
  initGithubPassport
}