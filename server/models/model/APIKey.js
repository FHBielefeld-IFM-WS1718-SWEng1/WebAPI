module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('APIKey', {
        id: {type: Sequelize.INTEGER, primaryKey: true, field:'ID'},
        apiKey: {type: Sequelize.STRING(50), field:'ApiKey'},
        user_id: {type: Sequelize.INTEGER},
        timestamps: false
    });
});