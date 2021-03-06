module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Contactlist', {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        user_id1: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID1'},
        user_id2: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID2'},
        status: {type: Sequelize.INTEGER, field: 'Status'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'}
    });
});