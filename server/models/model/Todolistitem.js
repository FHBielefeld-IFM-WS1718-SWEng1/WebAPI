module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Todolistitem', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        text: {type:Sequelize.TEXT , field: 'Text'},
        status: {type: Sequelize.INTEGER, field: 'Status'},
        party_id: {type: Sequelize.INTEGER, references: {model: 'Party', key: 'ID'}, field: 'Party_ID'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'}
    });
});