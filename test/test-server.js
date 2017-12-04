process.env.NODE_ENV = 'test';
global.Promise = require('promise');
global.chai = require('chai');
global.chaiHttp = require('chai-http');
chai.use(chaiHttp);
global.expect = chai.expect;
const app = require("../server/app");
global.server = app.listener;

it("erstellen der Datenbank. Warten auf abschliessen des erstellens", function(done){
    this.timeout(999999);
    app.sequelize
        .sync({force: true})
        .then(function (err) {
            done();
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
});