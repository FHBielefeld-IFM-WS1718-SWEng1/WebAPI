module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Task', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        text: {type: Sequelize.STRING(100), field: 'Text'},
        status: {type: Sequelize.INTEGER, field: 'Status'},
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID'},
        party_id: {type: Sequelize.INTEGER, references: {model: 'Party', key: 'ID'}, field: 'Party_ID'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'}
    });
});