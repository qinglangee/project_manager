const { app, BrowserWindow, Menu, ipcMain,
    dialog 
} = require('electron')

const dataManager = require('./data_manager');

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
    event.reply("loadData", dataManager.readData());
});

// 更新后的数据重新写入
ipcMain.on("updateData", function(event, projects){
    dataManager.writeData(projects);
    event.reply("updateData", dataManager.readData());
});

