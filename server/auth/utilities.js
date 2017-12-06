module.exports = {
    hasKey: (param, key) => {
        return key in param && param[key] !== undefined && param[key] !== null;
    },
    changeValueIfExists: (into, from, key) => {
        if(module.exports.hasKey(from, key)){
            into[key] = from[key];
        }
    }
};
