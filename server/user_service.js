
const userDao = require('./user_dao');
const moment = require('moment');

/**
 * 获取所有用户信息
 */
function getAllUsers(){
    return userDao.getAll();
}
/** 保存用户信息 */
function saveUser(user){
    user.id = moment().format('YYYYMMDDHHmmssSSS');
    return userDao.saveUser(user);
}

/**
 * 更新用户信息
 * @returns 
 */
function updateUser(user){
    return userDao.updateUser(user);
}

/** 删除用户信息 */
function deleteUser(id){
    return userDao.deleteUser(id);
}


exports = module.exports = {
    getAllUsers,
    saveUser,
    updateUser,
    deleteUser,
}