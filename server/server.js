const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const authRoute = require("./routes/auth");
const albumRoute = require("./routes/album");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
//const cookieSession = require("cookie-session");
const expressSession = require("express-session");
//const bodyParser = require("body-parser");
//const routes = require("./routes");

//.env File Config
dotenv.config();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//CORS to allow access between frontend and backend
app.use(cors());
/*
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
*/

//ROUTES
app.use("/app", routes);
app.use("/auth", authRoute);
app.use("/album", albumRoute);

app.use(
  expressSession({
    secret: "live",
    resave: false,
    saveUninitialized: false,
  })
);

//PASSPORT
require("./models/passport");
app.use(passport.initialize());
app.use(passport.session());

//MONGODB Database Connection
mongoose.connect(process.env.DATABASE, () =>
  console.log("Database Connected.")
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Start the API server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
