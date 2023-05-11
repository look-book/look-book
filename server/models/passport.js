const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1060203266514-jpethige3djutikif4age7bjdb76l44a.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "761783708288455",
      clientSecret: "c53f2dba58ec5bc87670563f9f6aef69",
      callbackURL: "/auth/facebook/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
    //Upload Facebook Images
    //If using MongoDB, take out done and create user {profile.displayName, profile.photos[0]}var with variables and save user.
  )
);


