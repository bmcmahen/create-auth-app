const passport = require('passport');
const RedditStrategy = require('passport-reddit').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new RedditStrategy(
    {
      clientID: keys.redditClientID,
      clientSecret: keys.redditClientSecret,
      callbackURL: '/auth/reddit/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ redditId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      console.log(`access: ${accessToken}`);
      console.log(`refresh: ${refreshToken}`);
      const user = await new User({
        redditId: profile.id,
        accessToken,
        refreshToken,
      }).save();
      done(null, user);
    },
  ),
);
