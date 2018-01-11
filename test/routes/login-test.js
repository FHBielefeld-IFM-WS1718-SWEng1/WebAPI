describe('login', () => {
    // TODO: before einrichten Test schlägt fehl da keine daten in der db existieren!
    before((done) => {
        chai.request(server)
            .post('/register')
            .send({name: "Peter", email: "fischer2@fisch.de", password: "strenggeheim"})
            .end(function (err, res) {
                done();
            });
    });
    describe('POST', () => {
        it('es ist erlaubt sich einzuloggen', (done) => {
            chai.request(server)
                .post('/login')
                .send({email: "fischer2@fisch.de", password: "strenggeheim"})
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
    describe('GET', () => {
        it('es ist nicht erlaubt einen GET auszuführen', (done) => {
            chai.request(server)
                .get('/login')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
    describe('PUT', () => {
        it('es ist nicht erlaubt einen PUT auszuführen', (done) => {
            chai.request(server)
                .put('/login')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
    describe('DELETE', () => {
        it('es ist nicht erlaubt einen DELETE auszuführen', (done) => {
            chai.request(server)
                .delete('/login')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    object = res.body;
                    done();
                });
        });
    });
});
