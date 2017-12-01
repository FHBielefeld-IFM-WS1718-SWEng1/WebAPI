module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('User', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        email: {type: Sequelize.STRING(100), field: 'Email', unique: true, allowNull: false},
        name: {type: Sequelize.STRING(50), field: 'Name', allowNull: false},
        password: {type: Sequelize.STRING(50), field: 'Password', allowNull: false},
        birthdate: {type: Sequelize.DATE, field: 'Birthdate'},
        gender: {type: Sequelize.STRING(5), field: 'Gender'},
        profilepicture: {type: Sequelize.STRING(100), field: 'Profilepicture'},
        loginAt: {type: Sequelize.DATE, field: 'LoginAt'},
        createdAt: {type: Sequelize.DATE, field: 'CreatedAt'},
        updatedAt: {type: Sequelize.DATE, field: 'ChangedAt'},
        deletedAt: {type: Sequelize.DATE, field: 'DeletedAt'}
    });
});