
const projectDao = require('./project_dao');
const moment = require('moment');

/**
 * 获取所有项目信息
 */
function getAllProjects(){
    return projectDao.getAll();
}
/** 保存项目信息 */
function saveProject(project){
    project.id = moment().format('YYYYMMDDHHmmssSSS');
    return projectDao.saveProject(project);
}

/**
 * 更新项目信息
 * @returns 
 */
function updateProject(project){
    return projectDao.updateProject(project);
}

/** 删除项目信息 */
function deleteProject(id){
    return projectDao.deleteProject(id);
}

function noParam(){
    return "no param";
}

function oneParam(para){
    return "one param " + para;
}

function multiParam(p1, p2){
    return "multi param p1:"+p1 + " ,p2:"+p2;
}


exports = module.exports = {
    getAllProjects,
    saveProject,
    updateProject,
    deleteProject,
    noParam,
    oneParam,
    multiParam,
}