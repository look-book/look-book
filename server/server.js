const path = require("path");
const express = require("express");
const { cloudinary } = require("./utils/cloudinary");
const mongoose = require("mongoose");
const routes = require("./routes");
// var cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
// app.use(cors);
// Define middleware here
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/look-book",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mangoDB is connected"))
  .catch((err) => console.log(err));

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
