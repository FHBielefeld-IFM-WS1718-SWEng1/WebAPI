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
                .field('api',getAPI("fischer@fisch.de"))
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    res.should.be.an('json');
                    object = res.body;
                    done();
                });
        });
        // hier der Test mit falschem ApiKey
        it('delete mit falschem apikey', (done) => {
            chai.request(server)
                .post('/login')
                .send({email:"fischer@fisch.de", password: "test"})
                .delete('/logout')
                .field('api','falscherApiKeyHier')
                .end(function (err,res){
                    assert.exists(res);
                    expect(res).to.have.status(401);
                    object = res.body;
                    done();
                });
        });
    });

});

/**
 * Die Methode holt sich den ApiKey mithilfe der Emailadresse
 * @param eMail die Emailadresse
 * @returns {apiKey} man braucht den ApiKey
 */
function getAPI(eMail){
    if(eMail !=null){
        models.User.findOne({where:{email:eMail}})
            .then((results) => {
                if(results!=null){
                    models.APIKey.findOne({where:{user_id:results.dataValues.id}})
                        .then((res) =>{
                            return res.dataValues.apiKey;
                        })
                        .catch((err) => {
                            console.log({name:"der User ist nicht angemeldet",message:err.toString()});
                        });
                }
            })
            .catch((err) =>{
                console.log({name:"es gibt keinen User mit der Emailadresse",message:err.toString()});
            });
    }
    return null;
}
