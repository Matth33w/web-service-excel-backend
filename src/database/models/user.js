const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    user: String,
    password: String,
    email: String,
    credits: Number
});

module.exports = mongoose.model("users", userSchema);