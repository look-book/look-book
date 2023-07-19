const express = require('express');
const {  createUpload, getUploads, deleteUpload, loveUpload, updateUpload, happyUpload, sadUpload, scaredUpload, angryUpload, getUpload, getUploadsByUser,} = require('../controller/uploads');

const router = express.Router();

router.get('/', getUploads);
router.post('/',  createUpload);
router.get('/', getUploadsByUser)
router.get('/:id', getUpload);
router.patch('/:id',  updateUpload);
router.delete('/:id',  deleteUpload);
router.patch('/:id/loveUpload', loveUpload);
router.patch('/:id/happyUpload', happyUpload);
router.patch('/:id/sadUpload', sadUpload);
router.patch('/:id/scaredUpload', scaredUpload);
router.patch('/:id/angryUpload', angryUpload);

module.exports = router;