const router = require("express").Router();
const passport = require("passport");
const User = require("../models/users");

//const ClientURL = "http://localhost:3000/";
const ClientURL = "https://look-book-act-group42.herokuapp.com/";

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

router.post("/auth/facebook", async (req, res) => {
  try {
    const { userId, accessToken } = req.body;
    if (!userId || userId == "" || !accessToken || accessToken == "") {
      return res
        .status(400)
        .json({ message: "userId and accessToken are required" });
    }
    //get user by facebook userId and accessToken
    let { data } = await getUserByFacebookIdAndAccessToken(accessToken, userId);
    //check if user exists
    const user = await User.findOne({ facebookId: data.id });
    const authObject = {};
    if (user) {
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "20h" });
      authObject = {
        auth: true,
        token,
        user,
        message: "Successfully logged in.",
      };
      return res.status(201).json(authObject);
    } else {
      user = await User.create({
        name: data.name,
        email: data.email,
        facebookId: data.id,
      });
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "20h" });
      authObject = {
        auth: true,
        token,
        user,
        message: "Successfully Registered.",
      };
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

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${ClientURL}profile`,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
