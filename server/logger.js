
const projectDao = require('./project_dao');


function log(pre, content){
    console.log(new Date(), pre, ...content);
}
function debug(content){
    return log("DEBUG", arguments);
}
function info(content){
    return log("INFO", arguments);
}
function warn(content){
    return log("WARN", arguments);
}
function error(content){
    return log("ERROR", arguments);
}


exports = module.exports = {
    log,
    info,
    debug,
    warn,
    error,
}