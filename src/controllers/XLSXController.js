const path = require('path');
const schedule = require('node-cron');
const fs = require('fs');
const xlsx = require('json-as-xlsx');
const crypto = require('crypto');

var usos = 5;

module.exports = {
    
    GenerateFile(request, response) {
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
            var colunasFormatadas = [];

            for (objeto of colunas) {
                const label = objeto.nome;
                const value = objeto.valor;

                colunasFormatadas.push({
                    label: label,
                    value: value
                });
            }

            var buffer = xlsx(colunasFormatadas, dados, settings, false);
            fs.writeFileSync(path.join(__dirname, "../", "..", "public", "planilhas-geradas", `${id}-${nomeDoArquivo}.xlsx`), buffer);

            console.log(`Arquivo gerado com sucesso.`);
            usos--;

            this.DeleteFile(path.join(__dirname, "../", "../", "public", "planilhas-geradas", `${id}-${nomeDoArquivo}.xlsx`));

            response.send({
                message: "Arquivo gerado com sucesso.",
                link: `http://localhost:3030/planilhas-geradas/${id}-${nomeDoArquivo}.xlsx`
            });

        } else {
            response.status(500).send({ message: "Você não tem saldo o suficiente" });
        }
    },

    DeleteFile(path) {
        schedule.schedule('* 1 * * * *', () => {
            fs.unlinkSync(path);
        });
    }
}