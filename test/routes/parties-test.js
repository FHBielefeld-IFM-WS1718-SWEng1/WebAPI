var object = {};
describe('parties', function () {
    it('should list ALL parties on /parties GET', function (done) {
        request(server)
            .get('/parties?api=fisch')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('should add a SINGLE blob on /parties POST', function (done) {
        request(server)
            .post('/parties?api=fisch')
            .send({name: "test", description: "beispiel"})
            .expect('Content-Type', /json/)
            .expect(function hasPreviousAndNextKeys(res) {
                object = res.body;
            })
            .expect(200, done)
    });
    it('should list a SINGLE party on /parties/<id> GET', function (done) {
        request(server)
            .get('/parties/' + object.id + '?api=fisch')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('should update a SINGLE blob on /parties/<id> PUT', function (done) {
        object.description = "test"
        object.name = "Beispiel t"
        request(server)
            .put('/parties/' + object.id + '?api=fisch')
            .send(object)
            .expect('Content-Type', /json/)
            .expect(object)
            .expect(200, done)
    });
    it('should delete a SINGLE blob on /parties/<id> DELETE', function (done) {
        request(server)
            .delete('/parties/' + object.id + '?api=fisch')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});
