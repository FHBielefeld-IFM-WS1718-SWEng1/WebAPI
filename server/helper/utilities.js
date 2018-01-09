module.exports = {
    hasKey: (param, key) => {
        return key in param && param[key] !== undefined && param[key] !== null;
    },
    changeValueIfExists: (into, from, key) => {
        if(module.exports.hasKey(from, key)){
            into[key] = from[key];
        }
    },
    removeTimeStamp: (tag) => {
        if(tag.createdAt ){
            delete tag.createdAt;
        }
        if(tag.updatedAt){
            delete tag.updatedAt;
        }
        if(tag.deletedAt){
            delete tag.deletedAt;
        }
    },
    removeKeysFromUser: (tag)=>{
        module.exports.removeTimeStamp(tag);
        if(tag.password){
            delete tag.password;
        }
    }
};
