const router = require("express").Router();
const passport = require("passport");

//const ClientURL = "http://localhost:3000/";
const ClientURL = "https://look-book-act-group42.herokuapp.com/";

router.get("/", (req, res) => {
  res.status(200).json({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(ClientURL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${ClientURL}profile`,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook")
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${ClientURL}profile`,
    failureRedirect: "/login/failed",
  })
);


module.exports = router;
