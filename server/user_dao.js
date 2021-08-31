const dataManager = require('./data_manager');

/**
 * 获取所有用户信息
 */
function getAll(){
    return dataManager.readUsers();
}
/**
 * 保存用户信息
 * @param {*} user 
 * @returns 0 保存成功 1 id 重复 2 其它错误
 */
function saveUser(user){
    let users = dataManager.readUsers();
    for(let p of users){
        if(p.id === user.id){
            return {code:1, message:"id 重复"};
        }
    }
    users.push(user);
    dataManager.writeUsers(users);
    return {code:0};
}

/**
 * 更新用户信息
 * @returns 
 */
function updateUser(user){
    let users = dataManager.readUsers();
    let old = null;
    for(let p of users){
        if(p.id === user.id){
            old = p;
        }
    }
    if(old == null){
        return {code:1, message:"要更新的 id 不存在"};
    }
    for(let prop in user){
        old[prop] = user[prop];
    }
    dataManager.writeUsers(users);
    return {code:0};
}

/** 删除 */
function deleteUser(id){
    let users = dataManager.readUsers();
    let find = false;
    for(let i in users){
        let p = users[i];
        if(p.id === id){
            users.splice(i, 1);
            find = true;
        }
    }
    if(!find){
        return {code:1, message:"要删除的 id 不存在"};
    }

    dataManager.writeUsers(users);
    return {code:0};
}

exports = module.exports = {
    getAll,
    saveUser,
    updateUser,
    deleteUser,
}