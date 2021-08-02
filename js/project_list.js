const { ipcRenderer } = require('electron')


ipcRenderer.on("abcd", (event, content)=>{
    // console.log("get content:", content.file);
    // FlightInfo.initData(content.lines, content.file);
    showMessage(content);
});

function sendMessage(){
    // console.log("send a message 123");
    ipcRenderer.send("abcd", 'openDirectory');
}


function showMessage(message){
    console.log("zhmsg", message);
}

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



let data = {
    projects:[]
};
var vm = new Vue({
    el: '#project_list',
    data: data,
    methods: {
        details: function() {
            return  this.site + " - 学的不仅是技术，更是梦想！";
        }
    }
});

pageLoad();