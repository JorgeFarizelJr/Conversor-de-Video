const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');

const videosRouter = require('./routes/videos');

const app = express();

// Middleware para analisar corpos de solicitação JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para manipulação de vídeos
app.use('/videos', videosRouter);

// Configure o AWS SDK com suas credenciais
AWS.config.update({
    credentials: {
        accessKeyId: 'SEU_ACCESS_KEY_ID',
        secretAccessKey: 'SEU_SECRET_ACCESS_KEY'
    },
    region: 'sua-regiao-do-S3' // Substitua pela região do seu bucket do Amazon S3
});

// Crie um cliente S3
const s3 = new AWS.S3();

// Rota para download de vídeo convertido
app.get('/video_convertido.mp4', (req, res) => {
    const params = {
        Bucket: 'seu-bucket', // Substitua pelo nome do seu bucket do Amazon S3
        Key: 'caminho/para/seu/video_convertido.mp4' // Substitua pelo caminho do vídeo convertido no S3
    };

    // Baixe o vídeo do Amazon S3
    s3.getObject(params, (err, data) => {
        if (err) {
            console.error('Erro ao baixar o vídeo do Amazon S3:', err);
            return res.status(500).send('Ocorreu um erro ao baixar o vídeo.');
        }

        // Defina os cabeçalhos de resposta para o download do arquivo
        res.setHeader('Content-disposition', 'attachment; filename=video_convertido.mp4');
        res.setHeader('Content-type', 'video/mp4');

        // Envie o conteúdo do arquivo como resposta
        res.send(data.Body);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
