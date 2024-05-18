const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadVideo, convertVideo, downloadVideo } = require('../utils/videoHandler');

const upload = multer({ dest: 'uploads/' });

// Rota para upload de vídeo
router.post('/upload', upload.single('video'), uploadVideo);

// Rota para conversão de vídeo
router.post('/convert', convertVideo);

// Rota para download de vídeo convertido
router.get('/download/:filename', downloadVideo);

module.exports = router;
