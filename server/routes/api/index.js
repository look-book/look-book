const router = require("express").Router();
const cloudinaryRoutes = require("./cloudinary");
const userRoutes = require("./user");
// user route
router.use("/user", userRoutes);
// cloudinary route
router.use("/cloudinary", cloudinaryRoutes);
module.exports = router;
