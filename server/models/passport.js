const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: '1060203266514-jpethige3djutikif4age7bjdb76l44a.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: '761783708288455',
      clientSecret: 'c53f2dba58ec5bc87670563f9f6aef69',
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
//Upload Facebook Images
      //If using MongoDB, take out done and create user {profile.displayName, profile.photos[0]}var with variables and save user.
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


//username password
const authenticateUser = async (email, password, done) => {
  console.log('email', email)

  console.log('password', password)

  //call db to get data
  try{
    const response = await axios.post("http://localhost:5000/app/fetchUser",
    JSON.stringify({ username:email }),
    {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    }
  );
    const user = response.data;
  try {
    const decrypt  = await bcrypt.compare(password, user.password);
    if (decrypt) {
      console.log("SUCCESS 2022");
      return done(null, user, { message: 'Password is correct' })
    } else {
      console.log("FAILURE 2022");
      return done(null, false, { message: 'Password incorrect' })
    }
  } catch (e) {
    console.log("FAILURE 2022", e);
    return done(e)
  }

  }catch(err){
    console.log("Fetching user failed", err);
  }
  

  try {
      return done(null, {
        username: email, 
        password:password
      })
  } catch (e) {
    return done(e)
  }
}
passport.use(new LocalStrategy({usernameField:'username'}, authenticateUser))
// passport.use(new LocalStrategy(
//   async function(username, password, done) {

//     if (username == null) {
//       return done(null, false, { message: 'No user with that email' })
//     }

    // try {
    //   if (await bcrypt.compare(password, user.password)) {
    //     return done(null, user)
    //   } else {
    //     return done(null, false, { message: 'Password incorrect' })
    //   }
    // } catch (e) {
    //   return done(e)
    // }
//   }
// ));


const init = (passport, getUserByEmail, getUserById) =>{



}


module.exports =  init;

// module.exports = function initialize(passport, getUserByEmail, getUserById) {
  // const authenticateUser = async (email, password, done) => {
  //   const user = getUserByEmail(email)
  //   console.log('user', user)

  //   if (user == null) {
  //     return done(null, false, { message: 'No user with that email' })
  //   }

  //   try {
  //     if (await bcrypt.compare(password, user.password)) {
  //       return done(null, user)
  //     } else {
  //       return done(null, false, { message: 'Password incorrect' })
  //     }
  //   } catch (e) {
  //     return done(e)
  //   }
  // }

//   passport.use(new LocalStrategy( authenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id))
//   })
// }

