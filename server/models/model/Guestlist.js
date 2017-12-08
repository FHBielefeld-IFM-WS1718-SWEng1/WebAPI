module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Guestlist', {
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID', primaryKey: true},
        party_id: {type: Sequelize.INTEGER, references: {model: 'Party', key: 'ID'}, field: 'Party_ID', primaryKey: true},
        status: {type: Sequelize.INTEGER, field: 'Status'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'}
    });
});