const express = require('express');
const path = require('path');
const videosRouter = require('./routes/videos');

const app = express();

// Middleware para analisar corpos de solicitação JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para manipulação de vídeos
app.use('/videos', videosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
