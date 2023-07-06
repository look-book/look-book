module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/loginUser");
    },
    LoggedIn: (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/profile");
    }
  };