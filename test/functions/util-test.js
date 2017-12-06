const util = require("../../server/auth/utilities");
describe('Utilities', () => {
    describe('hasKey', () => {
        describe('Key vorhanden ', () => {
            let ob = {name: "Peter", integer: 12, temp: [], obje: {}};
            ["name", "integer", "temp", "obje"].forEach((value) => {
                it(value + " soll vorhanden sein", function (done) {
                    let ergebnis = util.hasKey(ob, value);
                    expect(ergebnis).to.be.true;
                    done();
                });
            });
        });
        describe('Sonderfälle', () => {
            it('should be false if the key does not exist', (done) => {
                let ergebnis = util.hasKey({}, "id");
                expect(ergebnis).to.be.false;
                done();
            });
            it('False wenn die Value undefined ist', (done) => {
                let ergebnis = util.hasKey({id: undefined}, "id");
                expect(ergebnis).to.be.false;
                done();
            });
            it('False wenn die Value null ist', (done) => {
                let ergebnis = util.hasKey({id: null}, "id");
                expect(ergebnis).to.be.false;
                done();
            });
        });
    });
    describe('changeValueIFExists', () => {
        describe('Key vorhanden ', () => {
            let fromob, intoob;
            beforeEach((done) => {
                fromob = {name: "Peter", integer: 12, temp: [], obje: {}};
                intoob = {};
                done();
            });

            ["name", "integer", "temp", "obje"].forEach((value) => {
                it(value + " soll vorhanden sein", function (done) {
                    util.changeValueIfExists(intoob, fromob, value);
                    expect(intoob[value]).to.be.equal(fromob[value]);
                    done();
                });
            });
        });
    });
});