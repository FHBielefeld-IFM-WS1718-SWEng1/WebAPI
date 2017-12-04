var exports = module.exports = function (sequelize, Sequelize) {
    var temp = {};
    // model definitionen
    temp.User = require("./model/User.js")(sequelize, Sequelize);
    temp.Party = require("./model/Party.js")(sequelize, Sequelize);
    temp.APIKey = require("./model/APIKey.js")(sequelize, Sequelize);
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
    temp.Rating = require("./model/Rating")(sequelize, Sequelize);
    // Relationen
    temp.User.hasMany(temp.Party, {foreignKey: 'user_id'});
    temp.Party.belongsTo(temp.User, {foreignKey: 'user_id'});

    temp.User.hasMany(temp.APIKey, {foreignKey: 'user_id'});
    temp.APIKey.belongsTo(temp.User, {foreignKey: 'user_id'});

    temp.Contactlist.belongsTo(temp.User, {foreignKey: 'user_id1'});
    temp.User.hasMany(temp.Contactlist, {foreignKey: 'user_id1'});
    temp.Contactlist.belongsTo(temp.User, {foreignKey: 'user_id2'});
    temp.User.hasMany(temp.Contactlist, {foreignKey: 'user_id2'});

    temp.Guestlist.belongsTo(temp.Party, {foreignKey: 'party_id'});
    temp.Party.hasMany(temp.Guestlist, {foreignKey: 'party_id'});
    temp.Guestlist.belongsTo(temp.User, {foreignKey: 'user_id'});
    temp.User.hasMany(temp.Guestlist, {foreignKey: 'user_id'});

    temp.Comment.belongsTo(temp.Party, {foreignKey: 'party_id'});
    temp.Party.hasMany(temp.Comment, {foreignKey: 'party_id'});
    temp.Comment.belongsTo(temp.User, {foreignKey: 'user_id'});
    temp.User.hasMany(temp.Comment, {foreignKey: 'user_id'});

    temp.Answer.belongsTo(temp.Comment, {foreignKey: 'comment_id'});
    temp.Comment.hasMany(temp.Answer, {foreignKey: 'comment_id'});
    temp.Answer.belongsTo(temp.User, {foreignKey: 'user_id'});
    temp.User.hasMany(temp.Answer, {foreignKey: 'user_id'});

    temp.Calculationitem.belongsTo(temp.Party, {foreignKey: 'party_id'});
    temp.Party.hasMany(temp.Calculationitem, {foreignKey: 'party_id'});

    temp.Task.belongsTo(temp.Party, {foreignKey: 'party_id'});
    temp.Party.hasMany(temp.Task, {foreignKey: 'party_id'});
    temp.Task.belongsTo(temp.User, {foreignKey: 'user_id'});
    temp.User.hasMany(temp.Task, {foreignKey: 'user_id'});

    temp.Todolistitem.belongsTo(temp.Party, {foreignKey: 'party_id'});
    temp.Party.hasMany(temp.Todolistitem, {foreignKey: 'party_id'});

    temp.UserChoice.belongsTo(temp.Choice, {foreignKey: 'choice_id'});
    temp.Choice.hasMany(temp.UserChoice, {foreignKey: 'choice_id'});
    temp.UserChoice.belongsTo(temp.User, {foreignKey: 'user_id'});
    temp.User.hasMany(temp.UserChoice, {foreignKey: 'user_id'});

    temp.Voting.belongsTo(temp.Party, {foreignKey: 'party_id'});
    temp.Party.hasMany(temp.Voting, {foreignKey: 'party_id'});
    temp.Voting.belongsTo(temp.User, {foreignKey: 'user_id'});
    temp.User.hasMany(temp.Voting, {foreignKey: 'user_id'});

    return temp;
};