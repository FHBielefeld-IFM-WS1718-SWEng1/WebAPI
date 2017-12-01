var exports = module.exports = function(sequelize, Sequelize){
    var temp = {};
    temp.User = require("./model/User.js")(sequelize, Sequelize);
    temp.Party = require("./model/Party.js")(sequelize, Sequelize);
    temp.APIKey = require("./model/APIKey.js")(sequelize, Sequelize);
    return temp;
};