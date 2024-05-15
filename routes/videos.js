const express = require('express');
const router = express.Router();
const { uploadVideo, convertVideo } = require('../utils/videoHandler');

// Rota para upload de vídeo
router.post('/upload', uploadVideo);

// Rota para conversão de vídeo
router.post('/convert', convertVideo);

module.exports = router;
