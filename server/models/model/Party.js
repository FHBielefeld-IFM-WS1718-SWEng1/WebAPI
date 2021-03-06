module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Party', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        name: {type: Sequelize.STRING(50), field: 'Name'},
        description: {type: Sequelize.TEXT, field: 'Description'},
        startDate: {type: Sequelize.DATE, field: 'StartDate'},
        endDate: {type: Sequelize.DATE, field: 'EndDate'},
        location: {type: Sequelize.STRING(100), field: 'Location'},
        picture: {type: Sequelize.STRING(100), field: 'Picture'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'},
        deletedAt: {type: Sequelize.DATE, field: 'DeletedAt'},
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID'}
    }, {paranoid: true});
});