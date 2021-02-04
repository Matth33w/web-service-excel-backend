const mongoose = require("mongoose");
const userModel = require("../database/models/user");

const commands = require("../utils/commands");

module.exports = {
    async create(request, response) {
        const user = new userModel({
            name: request.body.name,
            user: request.body.user,
            password: commands.cryptographText(request.body.password),
            email: request.body.email,
            authorization: commands.generateAuthorization(),
            credits: 50
        });

        user.save((err, doc) => {
            response.send({ message: "User Created", authorizationToken: doc.authorization});
        });
    },

    read(request, response) {
        userModel.find({ authorization: request.body.authorization }, { name: 1, user: 1, email: 1, credits: 1 }, (err, docs) => {
            response.send(docs);
        });
    },

    edit(request, response) {

    },

    delete(request, response) {

    }
}