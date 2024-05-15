// s3.config.js
const { S3Client } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const s3Client = new S3Client({
    region: "us-east-1", // Altere conforme a região desejada
    credentials: fromIni({
        profile: "default" // ou altere para o nome do perfil do arquivo de credenciais
    })
});

module.exports = s3Client;
