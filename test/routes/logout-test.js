describe.skip('logout', () => {
    before((done)=>{
        chai.request(server)
            .post('/register')
            .send({email: "fischer@fisch.de", password: "test"})
            .end(function (err, res) {
                done();
            });
    });
    // Man Darf nur Logout mit delete aufrufen
    describe('DELETE', () => {
        it('es ist erlaubt einen DELETE auszuführen', (done) => {
            chai.request(server)
                .post('/login')
                .send({email:"fischer@fisch.de", password: "test"})
                .delete('/logout')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    object = res.body;
                    done();
                });
        });
        it('delete mit falschem apikey', (done) => {
            chai.request(server)
                .post('/login')
                .send({email:"fischer@fisch.de", password: "test"})
                .delete('/logout')
                .end(funktion (err,res){
                    expect(res).to.have.status(401);
                    expect(res).to.be.json;
                    object = res.body;
                    done();
            })
        });
    });
});
