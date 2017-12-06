describe.skip('user', () => {
    daten = {name: "DBTESTUSER", password: "strenggeheim", email: "test@test.de"};
    describe('POST', () => {
        it('Hinzufügen eines Users mit minimalDaten soll möglich sein', function (done) {
            chai.request(server)
                .post('/users')
                .send(daten)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.not.have.property('password');
                    expect(res.body).to.have.property('updatedAt');
                    expect(res.body).to.have.property('createdAt');
                    expect(res.body.name).to.not.be.empty;
                    expect(res.body.email).to.not.be.empty;
                    expect(res.body.id).to.not.be.undefined;
                    daten = res.body;
                    done();
                });
        });
    });
    describe('GET', () => {
        it('Es soll Keine Liste aller User abrufbar sein!', function (done) {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;
                    done();
                });
        });
        it('Es soll möglich sein von einem Bestimmten user die Daten zu bekommen ', function (done) {
            chai.request(server)
                .get('/users/' + daten.id)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.not.have.property('password');
                    expect(res.body).to.have.property('updatedAt');
                    expect(res.body).to.have.property('createdAt');
                    expect(res.body.name).to.not.be.empty;
                    expect(res.body.email).to.not.be.empty;
                    done();
                });
        });
    });
    describe('PUT', () => {
        it('should add a SINGLE blob on /parties POST', function (done) {
            var daten2 = Object.assign({},daten);

            delete daten2.password;
            delete daten2.id;
            daten2.name = "Peter2";
            chai.request(server)
                .put('/users/' + daten.id)
                .send(daten2)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.not.have.property('password');
                    expect(res.body).to.have.property('updatedAt');
                    expect(res.body).to.have.property('createdAt');
                    expect(res.body.name).to.not.be.empty;
                    expect(res.body.email).to.not.be.empty;
                    done();
                });
        });
    });
    describe('DELETE', () => {
        // todo Abfrage ob ein User gelöscht wurde!
        it('should update a SINGLE blob on /parties/<id> PUT', function (done) {
            chai.request(server)
                .delete('/users/' + daten.id)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
    });
});
