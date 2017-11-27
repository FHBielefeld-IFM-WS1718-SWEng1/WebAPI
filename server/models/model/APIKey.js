module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('APIKey', {
        ID: {type: Sequelize.INTEGER, primaryKey: true},
        ApiKey: {type: Sequelize.STRING(50)},
        User_ID: {type: Sequelize.INTEGER},
        timestamps: false
    });
});