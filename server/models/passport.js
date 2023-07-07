const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./users")
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

/* =================== Handeling Infinite run: Start ===================  */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// For Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // profile has all google login data
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */

      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // new user case
          // insert new user id
          new User({
            userId: profile.id,
            username: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
    }
  )
);


// For Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://look-book-act-group42.herokuapp.com/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "displayName", "profileUrl"]
    },
    (accessToken, refreshToken, profile, done) => {
      const {
        _json: { email, first_name, last_name , name}
      } = profile;
      console.log(profile);
      // profile has all google login data
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */

      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // new user case
          // insert new user id
          new User({
            userId: profile.id,
            email,
            username: name,
            firstName: first_name,
            lastName: last_name,
            picture: profile.profileUrl
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
    }
  )
);


/*
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile,accessToken, refreshToken);
    }
  )
);

// For facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, callback) => {
      callback(null, profile);
     
    }
  )
); 
*/



 
