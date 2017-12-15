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
            let mail = "fischer@fisch.de";
            let pwd = "test";
            chai.request(server)
                .post('/login')
                .send({email:mail, password: pwd}).then((result)=> {setAPI(mail);})
                .delete('/logout')
                .query('api','test')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(err).to.equal.null;
                    expect(res).to.be.an('json');
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
function setAPI(eMail){
    models.User.findOne({where:{email:eMail}})
        .then((results) => {
            if(results!=null){
                models.APIKey.findOne({where:{user_id:results.dataValues.id}})
                    .then((res) =>{
                        //hier wird der ApiKey des Users geaendert
                        res.dataValues.apiKey = test;
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
