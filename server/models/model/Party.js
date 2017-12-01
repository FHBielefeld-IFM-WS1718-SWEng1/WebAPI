module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Party', {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        name: {type: Sequelize.STRING(50)},
        description: {type: Sequelize.STRING},
        startDate: {type: Sequelize.DATE},
        endDate: {type: Sequelize.DATE},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'},
        deletedAt: {type: Sequelize.DATE, field: 'DeletedAt'},
        User_ID: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}}
    });
});