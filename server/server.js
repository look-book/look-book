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
const expressSession = require("express-session");
const methodOverride = require('method-override');
const flash = require('express-flash');
//.env File Config
dotenv.config();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
//DATABASE = 'mongodb+srv://lookbook-admin:Actgroup42*@cluster0.u5xrckk.mongodb.net/look-book?retryWrites=true&w=majority'
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            
  optionSuccessStatus:200,
  header: {
    "Access-Control-Allow-Origin": true,
  }
}
app.use(cors(corsOptions));

app.use(
  expressSession({
    secret: "live",
    resave: false,
    saveUninitialized: false,
  })
);

//random line to add to repo

//Login
app.use(methodOverride('_method'));
//app.use(express.urlencoded({ extended: false }));
app.use(flash());

//ROUTES
app.use("/app", routes);
app.use("/auth", authRoute);
app.use("/album", albumRoute);

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
