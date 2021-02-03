const mongoose = require("mongoose");
const userModel = require("../database/models/user");

module.exports = {
    async create(request, response) {
        const user = new userModel({
            name: request.body.name,
            user: request.body.user,
            password: request.body.password,
            email: request.body.email,
            credits: 50
        });

        user.save(() => {
            response.send({ message: "User Created" });
        });
    },

    read(request, response) {

    },

    edit(request, response) {

    },

    delete(request, response) {

    }
}