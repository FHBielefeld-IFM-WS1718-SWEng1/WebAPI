describe('logout', () => {
    describe('POST', () => {
        it('es ist erlaubt sich einzuloggen', (done) => {
            chai.request(server)
                .post('/logout')
                .send({email: "fisch@fisch.de", password: "strenggeheim"})
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
                .get('/logout')
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
                .put('/logout')
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
                .delete('/logout')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
});
