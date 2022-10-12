const router = require("express").Router();
const mongoose = require("mongoose");
const { cloudinary } = require("../utils/cloudinary");
const Album = require("../models/album");

router.get("/images", async (req, res) => {
  // console.log("Hi");
  const { resources } = await cloudinary.search
    .expression("folder:look-book")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    album = new Album({
      title: req.body.title,
      userId: "6344e357af48b1141af6b441",
    });
    album.save.then((result) => {
      console.log(result);
      res.status(201).json(result);
    });
  } catch (err) {
    console.error(err);
  }
});
// upload image to cloudinary and save to mongoDb
router.post("/upload", async (req, res) => {
  console.log(req.body);
  var flName = "look_book/";
  // console.log(flName);
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
      userId: "6344e357af48b1141af6b441",
      tag: req.body.tag,
      rating: 3,
      isFavorite: req.body.isFavorite,
      images: [
        {
          cloudinaryId: uploadedResponse.public_id,
          url: uploadedResponse.url,
        },
      ],
    });
    album.save().then((result) => {
      console.log(result);
      res.status(201).json(result);
    });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
