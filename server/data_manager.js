const fs = require("fs");
let config = require("./config.js");

let storeFile = config.dataDir + config.dataFile;
const userFile = config.dataDir + config.userFile;
/**
 * 从文件中读取项目数据
 */
function readProjects(){
    let rawdata = fs.readFileSync(storeFile);
    return JSON.parse(rawdata);
}
/** 项目数据写回到文件中 */
function writeProjects(projects){
    let content = JSON.stringify(projects, null, 2);
    fs.writeFileSync(storeFile, content);
}


/**
 * 从文件中读取用户数据
 */
function readUsers(){
    let rawdata = fs.readFileSync(userFile);
    return JSON.parse(rawdata);
}
/**用户数据写回到文件中 */
function writeUsers(users){
    let content = JSON.stringify(users, null, 2);
    fs.writeFileSync(userFile, content);
}

exports = module.exports = {
    readProjects,
    writeProjects,
    readUsers,
    writeUsers,
}