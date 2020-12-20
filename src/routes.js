const express = require('express');
const path = require('path');
const fs = require('fs');
const xlsx = require('json-as-xlsx');
const crypto = require('crypto');

const routes = express.Router();

var usos = 5;

routes.post("/download-file", async (request, response) => {
    const nomeDoArquivo = request.body.nome;
    const nomeDaPlanilha = request.body.planilha;
    const colunas = request.body.colunas;
    const dados = request.body.dados;

    const id = crypto.randomBytes(8).toString('hex');

    const auth = request.query.token;

    const settings = {
        sheetName: nomeDaPlanilha,
        fileName: nomeDoArquivo,
        extraLength: 12,
        writeOptions: {}
    };

    if (usos > 0) {
        var buffer = xlsx(colunas, dados, settings, false);
        await fs.writeFileSync(path.join(__dirname, "../", "public", "planilhas-geradas", `${id}-${nomeDoArquivo}.xlsx`), buffer);
        console.log(`Arquivo gerado com sucesso.`);
        usos--;
        response.send({
            message: "Arquivo gerado com sucesso.",
            link: `http://localhost:3030/planilhas-geradas/${id}-${nomeDoArquivo}.xlsx`    
        });
    } else {
        response.send({ message: "Você não tem saldo o suficiente" });
    }
});

module.exports = routes;