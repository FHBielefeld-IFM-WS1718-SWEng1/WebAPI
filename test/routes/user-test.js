describe('user', function () {
    it('should not list ALL users on /user GET', function (done) {
        request(server)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(401, done)
    });
    it('should list a SINGLE blob on /parties/<id> GET', function (done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('should add a SINGLE blob on /parties POST', function (done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('should update a SINGLE blob on /parties/<id> PUT', function (done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('should delete a SINGLE blob on /parties/<id> DELETE', function (done) {
        request(server)
            .post('/parties')
            .send({name: "Lan Party 2018", description: "Eine besonders gute Beschreibung einer lan party!"})
            .expect('Content-Type', /json/)
            .expect(function hasPreviousAndNextKeys(res) {


            })
            .expect(200, done)

    });
});
