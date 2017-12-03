describe('Parameterisierte', () => {
    describe('test ', () => {
        [1, 2, 3, 4].forEach((value) => {
            it('bla ' + value, function (done) {
                done();
            });
        });
    });
});
describe('Fuckyoutests', () => {
    it('fickdich', (done) => {
        chai.request(server)
            .post('/register')
            .send({
                "name": "Peter",
                "password": "fisch",
                "email": "demo@demo.de"
            })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                object = res.body;
                done();
                chai.request(server)
                    .post('/login')
                    .send({
                        "name": "Peter",
                        "password": "fisch",
                        "email": "demo@demo.de"
                    })
                    .end(function (err, res1) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        object = res1.body
                        done();
                        chai.request(server)
                            .get('/parties?api=' + res1.body.key)
                            .end(function (err, res) {
                                expect(res).to.have.status(200);
                                expect(res).to.be.json;
                                object = res.body
                                done();
                            });
                    });
            });
    });
});