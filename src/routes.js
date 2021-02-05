const express = require('express');
const routes = express.Router();

const UserController = require("./controllers/UserController");
const XLSXController = require("./controllers/XLSXController");

routes.get("/users", async (request, response) => UserController.authenticate(request, response));
routes.post("/users", async (request, response) => UserController.create(request, response));
routes.patch("/users", async (request, response) => UserController.login(request, response));

routes.post("/download-file", async (request, response) => XLSXController.GenerateFile(request, response));

module.exports = routes;