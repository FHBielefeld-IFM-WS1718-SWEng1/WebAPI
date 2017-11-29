module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Party', {
        ID: {type: Sequelize.INTEGER, primaryKey: true},
        Name: {type: Sequelize.STRING(50)},
        Description: {type: Sequelize.STRING},
        StartDate: {type: Sequelize.DATE},
        EndDate: {type: Sequelize.DATE},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'},
        deletedAt: {type: Sequelize.DATE, field: 'DeletedAt'},
        User_ID: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}}
    });
});