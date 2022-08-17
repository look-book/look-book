const router = require("express").Router();
const { cloudinary } = require("../../utils/cloudinary");
const albumController = require("../../controllers/albumController");
router.get("/images", async (req, res) => {
  console.log("Hi");
  const { resources } = await cloudinary.search
    .expression("folder:dev_setups")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadedResponse);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
