const dataManager = require('./data_manager');

/**
 * 获取所有项目信息
 */
function getAll(){
    return dataManager.readProjects();
}
/**
 * 保存项目信息
 * @param {*} project 
 * @returns 0 保存成功 1 id 重复 2 其它错误
 */
function saveProject(project){
    let projects = dataManager.readProjects();
    for(let p of projects){
        if(p.id === project.id){
            return {code:1, message:"id 重复"};
        }
    }
    projects.push(project);
    dataManager.writeProjects(projects);
    return {code:0};
}

/**
 * 更新项目信息
 * @returns 
 */
function updateProject(project){
    let projects = dataManager.readProjects();
    let old = null;
    for(let p of projects){
        if(p.id === project.id){
            old = p;
        }
    }
    if(old == null){
        return {code:1, message:"要更新的 id 不存在"};
    }
    for(let prop in project){
        old[prop] = project[prop];
    }
    dataManager.writeProjects(projects);
    return {code:0};
}

/** 删除 */
function deleteProject(id){
    let projects = dataManager.readProjects();
    let find = false;
    for(let i in projects){
        let p = projects[i];
        if(p.id === id){
            projects.splice(i, 1);
            find = true;
        }
    }
    if(!find){
        return {code:1, message:"要删除的 id 不存在"};
    }

    dataManager.writeProjects(projects);
    return {code:0};
}

exports = module.exports = {
    getAll,
    saveProject,
    updateProject,
    deleteProject,
}