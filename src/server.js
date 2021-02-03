const express = require('express');
const path = require('path');
const app = express();

const routes = require("./routes");
const connection = require("./database/connection");

app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}.`);
});