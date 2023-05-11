const SingleFile = require("../models/singlefile");
const MultipleFile = require("../models/multiplefile");
const cloudinary = require('../utils/cloudinary');


const singleFileUpload = async (req, res, next) => {
  const { name, emotion, image, username} = req.body;
  
    try {
      const result = await cloudinary.uploader.upload(image, {
          folder: "look-book",
          // width: 300,
          // crop: "scale"
      })
      const file = await Product.create({
         username,
          name,
          emotion,
          image: {
              public_id: result.public_id,
              url: result.secure_url
          },
          category
      });
      res.status(201).json({
          success: true,
          file
      })

  } catch (error) {
      console.log(error);
      next(error);
  }
}

const multipleFileUpload = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "look-book",
      // width: 300,
      // crop: "scale"
  })
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
               public_id: result.public_id,
                url: result.secure_url
      };
      filesArray.push(file);
    });
    const multipleFiles = new MultipleFile({
      username: req.body.username,
      title: req.body.title,
      files: filesArray
    });
    await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
    const userId = req.params.user;
  try {
    let files;
    if (userId) {
      files = await SingleFile.find({ _id: userId });
    } else {
        files = await SingleFile.find();
    }
      res.status(200).json(files);
    
  } catch (err) {
    res.status(500).json(err);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await MultipleFile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
 
};
