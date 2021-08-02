const { app, BrowserWindow, Menu, ipcMain,
    dialog 
} = require('electron')

const dataManager = require('./data_manager');
const projectService = require('./project_service');
const logger = require('./logger');

ipcMain.on('abcd', function(event, message){
    // console.log("nextTestFile:", message);
    // let dir = "d:/temp/d3/delete/mydata/";
    // fs.readdir(dir, function(err, files) {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     let index = Number(message) % files.length;
    //     console.log("file is :", files[index]);
    //     parseFile.parse(dir + files[index], function(result){
    //         event.reply("open_file", result);
    //     })
    // });
    event.reply("abcd", dataManager.readData());

    
});
// 加载所有数据返回
ipcMain.on("loadData", function(event, message){
    event.reply("loadData", []);
});

// 更新后的数据重新写入
ipcMain.on("updateData", function(event, projects){
    dataManager.writeData(projects);
    event.reply("updateData", []);
});



/**
 * 根据传入的参数调用不同的函数
 * 
 * paras: {funName:, paras:{ 其它参数 }}
 * 
 * 返回数据 {code :0, message:"...", data:{....}}
 * code 为 0 是正常返回, 1 是有错误， 有错误时message会有错误消息
 * 正确返回时 data 中包含函数的返回信息
 */
ipcMain.on("serverCall", function(event, paras){
    const funcName = paras.fun;
    const args = paras.args || [];
    event.reply(funcName, serverCall(funcName, args));
});


function serverCall(funcName, args){
    if(projectService[funcName] != null){
        console.log("find fun ", funcName);
        let ret = projectService[funcName](...args);
        console.log("call " + funcName + " " + ret);
        return success(ret);
    }else{
        logger.error("not found " , funcName);
        return {code:1, message:"function not found: " + funcName}
    }

}

function success(data){
    if(data.code != null){
        return data;
    }else{
        return {code:0, data:data}
    }
}