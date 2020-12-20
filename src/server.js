const express = require('express');
const path = require('path');
const app = express();

const routes = require("./routes");

app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.json());
app.use(routes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}.`);
});