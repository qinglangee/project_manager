const fs = require("fs");
let config = require("./config.js");

let storeFile = config.dataDir + config.dataFile;
/**
 * 从文件中读取数据
 */
function readData(){
    let rawdata = fs.readFileSync(storeFile);
    // console.log("rawdata", rawdata);
    let datas = JSON.parse(rawdata);
    return datas;
}
/** 数据写回到文件中 */
function writeData(projects){
    let content = JSON.stringify(projects, null, 2);
    fs.writeFileSync(storeFile, content);
}

exports = module.exports = {
    readData,
    writeData,
}