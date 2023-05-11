
const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles,getsingleFileUpload} = require('../controller/fileuploaderController');
const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/singleFile/:id', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);

module.exports = {
    routes: router
}