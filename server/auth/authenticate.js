module.exports = function (req) {
    if("api" in req.query && req.query.api){
        req.models.APIKey.findOne({where: {apiKey : req.query.api}}).then((results) => {
            if(results){
                return true;
            }
        }).catch((error)=>{
            return false;
        });
    }else{
        return false;
    }
};
