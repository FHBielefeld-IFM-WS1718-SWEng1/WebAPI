var object = {};
describe('parties', () => {
    describe('POST', () => {
        // todo better tests
        it('should add a SINGLE blob on /parties POST', function (done) {
            chai.request(server)
                .post('/parties?api=Fisch')
                .send({name: "test", description: "beispiel"})
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
    describe('GET', () => {
        // todo bessere tests
        it('should list ALL parties on /parties GET', function (done) {
            chai.request(server)
                .get('/parties?api=Fisch')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
        // todo bessere tests
        it('should list a SINGLE party on /parties/<id> GET', function (done) {
            chai.request(server)
                .get('/parties/' + object.id + '?api=Fisch')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
    describe('PUT', () => {
        // todo bessere tests
        it('should update a SINGLE blob on /parties/<id> PUT', function (done) {
            object.description = "test"
            object.name = "Beispiel t"
            chai.request(server)
                .put('/parties/' + object.id + '?api=Fisch')
                .send(object)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
    describe('DELETE', () => {
        // todo bessere tests
        it('should delete a SINGLE blob on /parties/<id> DELETE', function (done) {
            chai.request(server)
                .delete('/parties/' + object.id + '?api=Fisch')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body
                    done();
                });
        });
    });
});