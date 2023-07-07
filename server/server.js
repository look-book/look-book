const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const { config } = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authGoogle = require("./routes/auth");
const postRoutes = require("./routes/postRoutes");
const Router = require("./routes/routes");
const uploadRoutes = require("./routes/uploadRoutes");
const questionRoutes = require("./routes/questionRoute");
const User = require("./models/users")
const axios = require("axios")
const jwt = require("jsonwebtoken")

//.env File Config
require("dotenv").config();
config();
const app = express();
const path = require("path");

//defining mongoose options
const corsOptions = {
  origin: [ "http://localhost:3000", "https://look-book-act-group42.herokuapp.com/",
  ],
  preflightContinue: false,
  credentials: true,
  header: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

app.use(cors(corsOptions));
// DB Config
const db = process.env.DATABASE;
// Connect to MongoDB
mongoose
  .connect(db || "mongodb://localhost/look-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
mongoose.set("strictQuery", false);
// use bodyparser middleware to receive form data

app.use(bodyParser.json({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: "live",
    resave: false,
    saveUninitialized: false,
  })
);

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
require("./models/passport");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//ROUTES

app.use("/", Router);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/api", routes);
app.use("/api", questionRoutes);
app.use("/auth", authGoogle);
app.use("/posts", postRoutes);
app.use("/uploads", uploadRoutes);

app.post('/user/facebook', async (req, res) => {
  try {
    const { userId = '', accessToken = '' } = req.body;
    if (userId === '' || accessToken === '') {
      return res.status(400).json({ message: "userId and accessToken are required" });
    }

    // Get user by Facebook userId and accessToken
    let { data } = await getUserByFacebookIdAndAccessToken(accessToken, userId);

    // Check if user exists
   const user = await User.findOne({ facebookId: data.id });
   const authObject = {};

    if (user) {
     const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '20h' });
      authObject = { auth: true, token, user, message: "Successfully logged in." };
      return res.status(201).json(authObject);
    } else {
      user = await User.create({
        name: data.name,
        username: data.displayName,
        firstName: data.name.givenName,
        lastName: data.name.familyName,
        picture: data.profilePic,
        email: data.email,
        facebookId: data.id
      });

     const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '20h' });
      authObject = { auth: true, token, user, message: "Successfully Registered." };
      return res.status(201).json(authObject);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

let getUserByFacebookIdAndAccessToken = (accessToken, userId) => {
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}?fields=id,name,email&access_token=${accessToken}`;
  let result = axios.get(urlGraphFacebook);
  return result;
};
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/build/index.html"));
});

// Start the API server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

