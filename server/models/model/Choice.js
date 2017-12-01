module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Choice', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        text: {type:Sequelize.STRING(100), field: 'Text'},
        voting_id: {type: Sequelize.INTEGER, references: {model: 'Voting', key: 'ID'}, field: 'Voting_ID'}
    });
});