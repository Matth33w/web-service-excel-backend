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

    authenticate(request, response) {
        userModel.findOne({ authorization: request.body.authorization, email: request.body.email }, { name: 1, user: 1, email: 1, credits: 1 }, (err, docs) => {
            if(docs){
                response.send({docs, authenticated: true});
            } else {
                response.send({ authenticated: false });
            }
        });
    },

    async login(request, response) {
        await userModel.findOne({ email: request.body.email, password: commands.cryptographText(request.body.password) }, async (err, doc) => {
            if(doc) {
                const newHash = commands.generateAuthorization();
                await userModel.updateOne({ email: request.body.email, authorization: doc.authorization }, { authorization: newHash }, (err, res) => {
                    response.send({message: "Logged in successfully!", auth: { authorization: newHash, email: request.body.email }});
                });
            } else {
                response.send({ message: "User not found!" });
            }
        });
    },

    edit(request, response) {
        
    },

    delete(request, response) {

    }
}