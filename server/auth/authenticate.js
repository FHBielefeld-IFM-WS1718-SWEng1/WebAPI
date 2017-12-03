module.exports = function (req) {
    var returnValue = false;
    if("api" in req.query && req.query.api){
        req.models.APIKey.findOne({where: {apiKey : req.query.api}}).then((results) => {
            if(results){
                returnValue = true;
            }
        }).catch((error)=>{
            returnValue = false;
        })
    }
    return returnValue;
};
