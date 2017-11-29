describe('user', () => {
    describe('GET', () => {
        it('Es soll Keine Liste aller User abrufbar sein!', function (done) {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                    expect(res).to.have.status(403);
                    expect(res).to.be.json;
                    done();
                });
        });
        it('Es soll möglich sein von einem Bestimmten user die Daten zu bekommen', function (done) {
            chai.request(server)
                .get('/users/1')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
    });
    describe('PUT', () => {
        it('should add a SINGLE blob on /parties POST', function (done) {
            chai.request(server)
                .get('/parties')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
    });
    describe('DELETE', () => {
        it('should update a SINGLE blob on /parties/<id> PUT', function (done) {
            chai.request(server)
                .get('/parties')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });

    });
    describe('POST', () => {
        it('should delete a SINGLE blob on /parties/<id> DELETE', function (done) {
            chai.request(server)
                .post('/parties')
                .send({name: "Lan Party 2018", description: "Eine besonders gute Beschreibung einer lan party!"})
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
    });
});
