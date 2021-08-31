const { ipcRenderer } = require('electron')





function showData(projects){

    console.log("pros", projects);
    data.projects = projects;
}

function finish(){
    console.log("call finish.");
    ipcRenderer.send("serverCall", {fun:"oneParam", args:["abc",123]});
    ipcRenderer.send("serverCall", {fun:"multiParam", args:["abc",123]});
    ipcRenderer.send("serverCall", {fun:"qqmultiParam", args:["abc",123]});
}

// 接受后端消息进行处理
ipcRenderer.on("oneParam", (event, resp)=>{
    console.log("from server", resp);
});
ipcRenderer.on("multiParam", (event, resp)=>{
    console.log("from server", resp);
});

// 接受后端消息进行处理
ipcRenderer.on("getAllProjects", (event, resp)=>{
    showData(resp.data);
});
// 发送消息与后端通信
function pageLoad(){
    ipcRenderer.send("serverCall", {fun:"getAllProjects"});
}
function setData(){
    ipcRenderer.send("updateData", data.projects);
}

/** 删除项目信息 */
function deleteProject(id){
    ipcRenderer.send("serverCall", {fun:"deleteProject", args:[id]});
}
// 删除项目结果处理
ipcRenderer.on("deleteProject", (event, resp)=>{
    showMessage(resp, "项目删除成功。");
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
    projects:[]
};
var vm = new Vue({
    el: '#project_list',
    data: data,
    methods: {
        details: function() {
            return  this.site + " - 学的不仅是技术，更是梦想！";
        },
        deleteProject:deleteProject,
    }
});

pageLoad();