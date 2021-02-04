const crypto = require("crypto");

module.exports = {
    generateAuthorization() {
        return crypto.randomBytes(64).toString("hex");
    },

    cryptographText(text) {
        const hash = crypto.createHash("sha256");
        hash.update(text);
        return hash.digest('hex');
    }
}