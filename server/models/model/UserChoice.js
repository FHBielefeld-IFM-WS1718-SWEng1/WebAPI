module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('UserChoice', {
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID'},
        choice_id: {type: Sequelize.INTEGER, references: {model: 'Choice', key: 'ID'}, field: 'Choice_ID'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'}
    });
});