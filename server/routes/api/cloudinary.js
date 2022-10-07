const router = require("express").Router();
const mongoose = require("mongoose");
const { cloudinary } = require("../../utils/cloudinary");
// const albumController = require("../../controllers/albumController");
const Album = require("../../models/album");
router.get("/images", async (req, res) => {
  // console.log("Hi");
  const { resources } = await cloudinary.search
    .expression("folder:dev_setups")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
router.post("/upload", async (req, res) => {
  console.log(req.body);
  var flName = "look_book/" + req.body.userId;
  console.log(flName);
  try {
    const fileStr = req.body.data;
    console.log(fileStr);

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      // upload_preset: "dev_setups",
      folder: flName,
    });
    console.log(uploadedResponse);
    var imgData = {
      cloudinaryId: uploadedResponse.public_id, // image id on cloudinary server
      path: uploadedResponse.url, // image url on cloudinary server
      created_at: new Date(),
      title: req.body.title,
      tag: req.body.location,
      rating: 3,
      isFavorite: true,
    };

    album = new Album({
      cloudinaryId: uploadedResponse.public_id, // image id on cloudinary server
      path: uploadedResponse.url, // image url on cloudinary server
      created_at: new Date(),
      title: req.body.title,
      tag: req.body.location,
      rating: 3,
      isFavorite: true,
    });
    album.save();
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
