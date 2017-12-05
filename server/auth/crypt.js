const crypto = require('crypto');

module.exports = {
    enc: (text) => {
        return crypto.createHash("sha256").update(text).digest("base64");
    },
    encurl: (text) => {
        return module.exports.enc(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
}
;
