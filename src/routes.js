const express = require('express');
const routes = express.Router();

const XLSXController = require("./controllers/XLSXController");

routes.post("/download-file", async (request, response) => XLSXController.GenerateFile(request, response));

module.exports = routes;