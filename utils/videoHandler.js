const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Defina o caminho para o ffmpeg e ffprobe se necessário
ffmpeg.setFfmpegPath('"C:\Users\jorge\Documents\Programação\ffmpeg\ffmpeg\bin\ffmpeg.exe"');
ffmpeg.setFfprobePath('"C:\Users\jorge\Documents\Programação\ffmpeg\ffmpeg\bin\ffprobe.exe"');

const uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }
    res.status(200).json({ message: 'Upload de vídeo concluído com sucesso.', filename: req.file.filename });
};

const convertVideo = (req, res) => {
    const inputFile = req.body.inputFile;
    const inputFilePath = path.join(__dirname, '..', 'uploads', inputFile);
    const outputFile = `${inputFile.split('.')[0]}_convertido.mp4`;
    const outputFilePath = path.join(__dirname, '..', 'uploads', outputFile);

    ffmpeg(inputFilePath)
        .output(outputFilePath)
        .on('end', () => {
            console.log('Conversão de vídeo concluída');
            res.status(200).json({ message: 'Conversão de vídeo concluída com sucesso.', outputFile });
        })
        .on('error', (err) => {
            console.error('Erro ao converter o vídeo:', err);
            res.status(500).json({ error: 'Ocorreu um erro ao converter o vídeo.' });
        })
        .run();
};

const downloadVideo = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    
    res.download(filePath, (err) => {
        if (err) {
            console.error('Erro ao baixar o vídeo:', err);
            res.status(500).send('Ocorreu um erro ao baixar o vídeo.');
        }
    });
};

module.exports = { uploadVideo, convertVideo, downloadVideo };
