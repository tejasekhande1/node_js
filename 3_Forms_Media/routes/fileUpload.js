const express = require("express");
const router = express.Router();

const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require('../controllers/fileUploadService')

router.post("/localFileUpload", localFileUpload)

module.exports = router;
