module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('User', {
        ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        Email: {type: Sequelize.STRING(50)},
        Name: {type: Sequelize.STRING(20)},
        Password: {type: Sequelize.STRING(50)},
        Birthdate: {type: Sequelize.DATE},
        Gender: {type: Sequelize.STRING(5)},
        Address: {type: Sequelize.STRING(50)},
        Profilepicture: {type: Sequelize.STRING(100)},
        LoginAt: {type: Sequelize.DATE},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'},
        deletedAt: {type: Sequelize.DATE, field: 'DeletedAt'}
    });
});