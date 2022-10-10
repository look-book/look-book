const router = require("express").Router();
const mongoose = require("mongoose");
const { cloudinary } = require("../utils/cloudinary");
const Album = require("../models/album");

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
  album = new Album({
    title: req.body.title,
    userId: 3,
    tag: req.body.location,
    rating: 3,
    isFavorite: true,
  });
  album.save().then((result) => {
    console.log(result);
  });
});
router.post("/", async (req, res) => {
  console.log(req.body);
  var flName = "look_book/";
  console.log(flName);
  try {
    const fileStr = req.body.data;
    console.log(fileStr);

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      // upload_preset: "dev_setups",
      folder: flName,
    });
    console.log(uploadedResponse);

    album = new Album({
      title: req.body.title,
      userId: 3,
      tag: req.body.location,
      rating: 3,
      isFavorite: true,
      images: [
        {
          cloudinaryId: uploadedResponse.public_id, // image id on cloudinary server
          path: uploadedResponse.url, // image url on cloudinary server
        },
      ],
    });
    album.save().then((result) => {
      const image = Image.findByIdAndUpdate(result.params.Album.images, {
        album: result.params.Album,
      });
    });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
