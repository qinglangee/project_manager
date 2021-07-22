try {
    require('electron-reloader')(module);
} catch {}
const { app, BrowserWindow, Menu, ipcMain,
    dialog 
} = require('electron')

let eventHandler = require('./server/event_handle')

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


function createWindow () {   
    const menuTEmplate = [
        {
            label: '文件',
            submenu: [
                {
                    label: '打开',
                    accelerator: 'Ctrl+O',
                    click: function(){
                        console.log(12345)
                        shell.openItem("d:/temp/d3/")
                    }
                },
                {
                    type:'separator'
                },
                {
                    label: '退出',
                    role: 'quit'
                }
            ]
        },
        // {
        //     label: 'View App',
        //     submenu: [
        //         {
        //             label: 'Reload'
        //         },
        //         {
        //             label: 'Toggle Full Screen'
        //         }
        //     ]
        // }
    ];
    const appMenu = Menu.buildFromTemplate(menuTEmplate);
    Menu.setApplicationMenu(appMenu);
    // 创建浏览器窗口
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 并且为你的应用加载index.html
    win.loadFile('html/project_list.html')
    // win.loadURL('https://www.electronjs.org/docs/tutorial')
    //   win.loadURL('http://127.0.0.1:5500/simple/index.html')
    win.webContents.on('dom-ready', () => {
        console.log("dom ready le  " + new Date());
        console.log("here 中文");
        // console.log(win.webContents);;
    })

    // 打开开发者工具
    win.webContents.openDevTools()
    console.log("index.js");

}


// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。
