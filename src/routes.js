const express = require('express');
const routes = express.Router();

const UserController = require("./controllers/UserController");
const XLSXController = require("./controllers/XLSXController");

routes.post("/users", async (request, response) => UserController.create(request, response));

routes.post("/download-file", async (request, response) => XLSXController.GenerateFile(request, response));

module.exports = routes;