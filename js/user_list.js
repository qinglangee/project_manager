const { ipcRenderer } = require('electron')


function showData(users){
    console.log("users", users);
    data.users = users;
}

// 接受用户信息进行处理
ipcRenderer.on("getAllUsers", (event, resp)=>{
    showData(resp.data);
});
// 发送消息取所有用户信息
function pageLoad(){
    ipcRenderer.send("serverCall", {fun:"getAllUsers"});
}

/** 删除用户信息 */
function deleteUser(id){
    let answer = confirm("真的要删除这个用户吗");
    if(!answer){
        return
    }
    ipcRenderer.send("serverCall", {fun:"deleteUser", args:[id]});
}
// 删除用户结果处理
ipcRenderer.on("deleteUser", (event, resp)=>{
    showMessage(resp, "用户删除成功。");
    pageLoad();
});


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
    users:[]
};
var vm = new Vue({
    el: '#user_list',
    data: data,
    methods: {
        details: function() {
            return  this.site + " - 学的不仅是技术，更是梦想！";
        },
        deleteUser:deleteUser,
    }
});

pageLoad();