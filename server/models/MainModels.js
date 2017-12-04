function bindbi(hasmany, belongs, key) {
    hasmany.hasMany(belongs, {foreignKey: key});
    belongs.belongsTo(hasmany, {foreignKey: key});
}

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
    bindbi(temp.User, temp.Party, 'user_id');
    bindbi(temp.User, temp.APIKey, 'user_id');
    bindbi(temp.User, temp.Contactlist, 'user_id1');
    bindbi(temp.User, temp.Contactlist, 'user_id2');
    bindbi(temp.User, temp.Guestlist, 'user_id');
    bindbi(temp.User, temp.Comment, 'user_id');
    bindbi(temp.User, temp.Answer, 'user_id');
    bindbi(temp.User, temp.Task, 'user_id');
    bindbi(temp.User, temp.UserChoice, 'user_id');
    bindbi(temp.User, temp.Voting, 'user_id');
    bindbi(temp.User, temp.Rating, 'user_id');

    bindbi(temp.Party, temp.Guestlist, 'party_id');
    bindbi(temp.Party, temp.Comment, 'party_id');
    bindbi(temp.Party, temp.Calculationitem, 'party_id');
    bindbi(temp.Party, temp.Task, 'party_id');
    bindbi(temp.Party, temp.Todolistitem, 'party_id');
    bindbi(temp.Party, temp.Voting, 'party_id');
    bindbi(temp.Party, temp.Rating, 'party_id');

    bindbi(temp.Comment, temp.Answer, 'comment_id');

    bindbi(temp.Choice, temp.UserChoice, 'comment_id');

    bindbi(temp.Voting, temp.Choice, 'voting_id');

    return temp;
};