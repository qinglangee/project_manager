const { ipcRenderer } = require('electron')

const moment = require('moment');


// 接受后端消息进行处理
ipcRenderer.on("saveUser", (event, resp)=>{
    showMessage(resp, "用户保存成功。");
});
ipcRenderer.on("updateUser", (event, resp)=>{
    showMessage(resp, "用户更新成功。");
});

// 接受后端消息进行处理
ipcRenderer.on("getAllUsers", (event, resp)=>{
    showData(resp.data);
});

/** 新增用户或保存修改 */
function save(){
    
    console.log("user is:", JSON.stringify(data.user));

    let user = data.user;
    if(user.id == null || user.id == ""){
        console.log("save user")
        ipcRenderer.send("serverCall", {fun:"saveUser", args:[user]});
    }else{
        console.log("update user")
        ipcRenderer.send("serverCall", {fun:"updateUser", args:[user]});
    }
}

function showMessage(resp, message){
    if(resp.code == 0){
        infoDialog(message);
    }else{
        infoDialog(resp.message);
    }
}

function infoDialog(message){
    alert(message);
}




let data = {
    user:{name:"用户"
    },
};
var vm = new Vue({
    el: '#user_info',
    data: data,
    methods: {
        details: function() {
            return  this.site + " - 学的不仅是技术，更是梦想！";
        },
    }
});
