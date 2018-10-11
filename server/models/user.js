const db = require('../config/db.js'), 
      userModel = '../schema/user.js'; 
const NavDb = db.Nav; 

const User = NavDb.import(userModel) 

const getUserById = async function (id) {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  })

  return userInfo // return data
}

const getUserByName = async function (name) {
  const userInfo = await User.findOne({
    where: {
      username: name
    }
  })

  return userInfo // return data
}

module.exports = {
  getUserById,
  getUserByName
}
