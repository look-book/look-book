const e = require("express");
const mongoose = require("mongoose");
const expressHandler = require("express-async-handler");
const Upload = require("../models/upload");
const User = require("../models/users")
const verifyJWT = require("../verifyJWT");

const getUploads = expressHandler(async (req, res) => {
  try {
    const uploads = await Upload.find();

    res.status(200).json(uploads);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getUpload = expressHandler(verifyJWT, async (req, res) => {
  const username = req.params.userId;
  User.findOne({ username: username });

  const { id } = req.params;

  try {
    const upload = await Upload.findById(id, username);

    res.status(200).json(upload);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createUpload = expressHandler( async (req, res) => {
  const username = req.params.userId;
  User.findOne({ username: username });
  const {
    myFile,
    title,
    loveCount,
    happyCount,
    sadCount,
    angryCount,
    scaredCount,
  } = req.body;

  const newUpload = new Upload({
    myFile,
    authorName: username,
    title,
    loveCount,
    happyCount,
    sadCount,
    angryCount,
    scaredCount,
  });

  try {
    await newUpload.save();

    res.status(201).json(newUpload);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const updateUpload = expressHandler(verifyJWT, async (req, res) => {
  const username = req.params.userId;
  User.find({ username: username });
  const { id } = req.params;
  const {
    myFile,
    title,
    loveCount,
    authorName,
    happyCount,
    sadCount,
    angryCount,
    scaredCount,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No upload with id: ${id}`);

  const updateUpload = {
    myFile,
    title,
    authorName: username,
    loveCount,
    happyCount,
    sadCount,
    angryCount,
    scaredCount,
    _id: id,
  };

  await Upload.findByIdAndUpdate(id, updateUpload, authorName, {
    new: true,
    authorName: username,
  });
  await User.findByIdAndUpdate(username);

  res.json(updateUpload);
});

const deleteUpload = expressHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No upload with id: ${id}`);

  await Upload.findByIdAndRemove(id);

  res.json({ message: "Upload deleted successfully." });
});

const loveUpload = expressHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No upload with id: ${id}`);

  const upload = await Upload.findById(id);

  const updatedUpload = await Upload.findByIdAndUpdate(
    id,
    { loveCount: upload.loveCount + 1 },
    { new: true }
  );

  res.json(updatedUpload);
});

const happyUpload = expressHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No upload with id: ${id}`);

  const upload = await Upload.findById(id);

  const updatedUpload = await Upload.findByIdAndUpdate(
    id,
    { happyCount: upload.happyCount + 1 },
    { new: true }
  );

  res.json(updatedUpload);
});

const sadUpload = expressHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const upload = await Upload.findById(id);

  const updatedUpload = await Upload.findByIdAndUpdate(
    id,
    { sadCount: upload.sadCount + 1 },
    { new: true }
  );

  res.json(updatedUpload);
});

const scaredUpload = expressHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const upload = await Upload.findById(id);

  const updatedUpload = await Upload.findByIdAndUpdate(
    id,
    { scaredCount: upload.scaredCount + 1 },
    { new: true }
  );

  res.json(updatedUpload);
});

const angryUpload = expressHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No upload with id: ${id}`);

  const upload = await Upload.findById(id);

  const updatedUpload = await Upload.findByIdAndUpdate(
    id,
    { angryCount: upload.angryCount + 1 },
    { new: true }
  );

  res.json(updatedUpload);
});

module.exports = {
  getUpload,
  getUploads,
  deleteUpload,
  updateUpload,
  createUpload,
  loveUpload,
  happyUpload,
  sadUpload,
  scaredUpload,
  angryUpload,
};
