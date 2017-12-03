module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('APIKey', {
        id: {type: Sequelize.INTEGER, primaryKey: true, field: 'ID'},
        apiKey: {type: Sequelize.STRING(50), field: 'ApiKey', unique: true},
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID'}
    }, {
        timestamps: false
    });
});