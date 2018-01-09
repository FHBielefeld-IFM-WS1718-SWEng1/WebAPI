module.exports = function (req) {
    return new Promise((resolve, reject) => {
        if ("api" in req.query && req.query.api) {
            req.models.APIKey.findOne({where: {apiKey: req.query.api}}).then((results) => {
                if (results) {
                    req.apikey = req.query.api;
                    req.userid = results.dataValues.user_id;
                    resolve("true");
                } else {
                    reject({status: 403, message: "kein gültiger api schlüssel"});
                }
            }).catch((error) => reject(error));
        } else {
            reject({status: 401, message: "Kein API Key angegeben!"});
        }
    });
};
