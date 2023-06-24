const express = require('express');
const { getUpload, createUpload, getUploads, deleteUpload, loveUpload, updateUpload, happyUpload, sadUpload, scaredUpload, angryUpload } = require('../controller/uploads');

const router = express.Router();

router.get('/', getUploads);
router.post('/', createUpload);
router.get('/:id/userId', getUpload);
router.patch('/:id', updateUpload);
router.delete('/:id', deleteUpload);
router.patch('/:id/loveUpload', loveUpload);
router.patch('/:id/happyUpload', happyUpload);
router.patch('/:id/sadUpload', sadUpload);
router.patch('/:id/scaredUpload', scaredUpload);
router.patch('/:id/angryUpload', angryUpload);

module.exports = router;