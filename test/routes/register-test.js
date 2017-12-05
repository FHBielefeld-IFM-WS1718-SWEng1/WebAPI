describe('register', () => {
    describe('POST', () => {
        it('es ist erlaubt einen neuen Nutzer anzulegen', (done) => {
            chai.request(server)
                .post('/register')
                .send({name: "Peter", email: "fisch@fisch.de", password: "strenggeheim"})
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body;
                    done();
                });
        });
    });
    describe('GET', () => {
        it('es ist nicht erlaubt einen GET auszuführen', (done) => {
            chai.request(server)
                .get('/register')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    object = res.body;
                    done();
                });
        });
    });
    describe('PUT', () => {
        it('es ist nicht erlaubt einen PUT auszuführen', (done) => {
            chai.request(server)
                .put('/register')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    object = res.body;
                    done();
                });
        });
    });
    describe('DELETE', () => {
        it('es ist nicht erlaubt einen DELETE auszuführen', (done) => {
            chai.request(server)
                .delete('/register')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json
                    object = res.body;
                    done();
                });
        });
    });
});
