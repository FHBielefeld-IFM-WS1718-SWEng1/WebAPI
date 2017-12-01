module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Answer', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        text: {type:Sequelize.TEXT, field: 'Text'},
        user_id: {type: Sequelize.INTEGER, references: {model: 'User', key: 'ID'}, field: 'User_ID'},
        comment_id: {type: Sequelize.INTEGER, references: {model: 'Comment', key: 'ID'}, field: 'Comment_ID'}
    });
});