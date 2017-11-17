//var server = "http://localhost:8080";
var should = require('should/as-function');
const request = require('supertest');
const server = require("../server/app")


describe('parties', function() {
    it('should list ALL blobs on /blobs GET', function(done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200,done)
    });
    it('should list a SINGLE blob on /blob/<id> GET', function(done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200,done)
    });
    it('should add a SINGLE blob on /blobs POST', function(done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200,done)
    });
    it('should update a SINGLE blob on /blob/<id> PUT', function(done) {
        request(server)
            .get('/parties')
            .expect('Content-Type', /json/)
            .expect(200,done)
    });
    it('should delete a SINGLE blob on /blob/<id> DELETE', function(done) {
        request(server)
            .post('/parties')
            .send({name : "Lan Party 2018",description : "Eine besonders gute Beschreibung einer lan party!"})
            .expect('Content-Type', /json/)
            .expect(200 , done)
    });
});

server.close();