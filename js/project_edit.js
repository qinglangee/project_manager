const { ipcRenderer } = require('electron')

const moment = require('moment');


// 接受后端消息进行处理
ipcRenderer.on("saveProject", (event, resp)=>{
    showMessage(resp, "项目保存成功。");
});
ipcRenderer.on("updateProject", (event, resp)=>{
    showMessage(resp, "项目更新成功。");
});

// 接受后端消息进行处理
ipcRenderer.on("getAllProjects", (event, resp)=>{
    showData(resp.data);
});

/** 新增项目或保存修改 */
function save(){
    
    console.log("project is:", JSON.stringify(data.pro));

    let project = data.pro;
    if(typeof(project.code) === "string"){
        project.code = project.code.split(",");
    }
    if(typeof(project.tools) === "string"){
        project.tools = project.tools.split(",");
    }
    if(project.id == null || project.id == ""){
        console.log("save project")
        ipcRenderer.send("serverCall", {fun:"saveProject", args:[project]});
    }else{
        console.log("update project")
        ipcRenderer.send("serverCall", {fun:"updateProject", args:[project]});
    }
}
function setData(){
    ipcRenderer.send("updateData", data.projects);
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
    pro:{
        time:moment().format('YYYYMMDD-HH:mm'),
        state:0,
        price:200,
        percent:0.8,
    },
    states:{
        "0":"未下单",
        "1":"进行中",
        "2":"写完未交",
        "3":"交视频，等验收",
        "4":"收货，好评",
        "5":"店收钱，群改名",
        "6":"结帐，结束",
    }
};
var vm = new Vue({
    el: '#project_info',
    data: data,
    methods: {
        details: function() {
            return  this.site + " - 学的不仅是技术，更是梦想！";
        },
        showState: function(state){
            if(state in this.states){
                return this.states[state];
            }else{
                return "未知状态";
            }
        }
    }
});
