const router = require("express").Router();
const cloudinaryRoutes = require("./cloudinary");
// cloudinary route
router.use("/cloudinary", cloudinaryRoutes);
module.exports = router;
