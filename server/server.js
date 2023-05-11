
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer")
const passport = require("passport");
const expressSession = require("express-session");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const authGoogle = require("./routes/auth");
const postRoutes = require("./routes/postRoutes");
const Router = require("./routes/routes")
const fileRoutes = require('./routes/file-upload-routes');
const categoryRoute = require("./routes/categories");

//.env File Config
require("dotenv").config()
const app = express();
const path = require("path");


//defining mongoose options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
  header: {
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

app.use(cors(corsOptions));
// DB Config
const db = process.env.DATABASE;
// Connect to MongoDB
mongoose
  .connect( db || "mongodb://localhost/look-book", 
  { useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
  mongoose.set('strictQuery', false);
// use bodyparser middleware to receive form data
// use bodyparser middleware to receive form data

app.use(bodyParser.json({limit: '50mb', extended: false}))
app.use(bodyParser.urlencoded({limit: "50mb", extended:true}))

app.use(express.urlencoded({limit: '50mb', extended:true}));
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
//DATABASE = 'mongodb+srv://lookbook-admin:Actgroup42*@cluster0.u5xrckk.mongodb.net/look-book?retryWrites=true&w=majority'

//middleware
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));
//Login

//ROUTES
app.use("/", Router)
app.use("/", authRoutes)
app.use("/", userRoutes)
app.use("/api", routes);
app.use("/auth", authGoogle);
app.use("/posts", postRoutes);
app.use("/api/categories", categoryRoute);

app.use('/api', fileRoutes.routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the API server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
