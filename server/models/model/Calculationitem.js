module.exports = (function (sequelize, Sequelize) {
    return sequelize.define('Calculationitem', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID'},
        text: {type:Sequelize.STRING(100) , field:'Text'},
        cost: {type: Sequelize.FLOAT, field: 'Cost'},
        party_id: {type: Sequelize.INTEGER, references: {model: 'Party', key: 'ID'}, field: 'Party_ID'}
    });
});