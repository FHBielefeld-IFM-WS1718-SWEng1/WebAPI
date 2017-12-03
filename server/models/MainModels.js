var exports = module.exports = function(sequelize, Sequelize){
    var temp = {};
    temp.User = require("./model/User.js")(sequelize, Sequelize);
    temp.Party = require("./model/Party.js")(sequelize, Sequelize);
    temp.APIKey = require("./model/APIKey.js")(sequelize, Sequelize);
    temp.User.hasMany(temp.APIKey);
    temp.APIKey.belongsTo(temp.User);
    temp.Contactlist = require("./model/Contactlist.js")(sequelize, Sequelize);
    temp.Guestlist = require("./model/Guestlist.js")(sequelize, Sequelize);
    temp.Comment = require("./model/Comment.js")(sequelize, Sequelize);
    temp.Answer = require("./model/Answer.js")(sequelize, Sequelize);
    temp.Todolistitem = require("./model/Todolistitem.js")(sequelize, Sequelize);
    temp.Calculationitem = require("./model/Calculationitem.js")(sequelize, Sequelize);
    temp.Voting = require("./model/Voting.js")(sequelize, Sequelize);
    temp.Task = require("./model/Task.js")(sequelize, Sequelize);
    temp.Choice = require("./model/Choice.js")(sequelize, Sequelize);
    temp.UserChoice = require("./model/UserChoice.js")(sequelize, Sequelize);
    return temp;
};