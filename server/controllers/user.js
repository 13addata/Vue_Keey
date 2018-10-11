const user = require('../models/user.js');
const jwt = require('jsonwebtoken'); // use jsonwebtoken instead of koa-jwt here.
const bcrypt = require('bcryptjs');

const getUserInfo = async function (ctx) {
  const id = ctx.params.id
  const result = await user.getUserById(id)
  ctx.body = result // return result in body.response 
}

const postUserAuth = async function (ctx) {
  const data = ctx.request.body // save data posted in request.body
  const userInfo = await user.getUserByName(data.name)
  if (userInfo != null) { // return null if there is no such user
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false,
        info: 'Password does not match. Please try again.'
      }
    } else {
      const userToken = {
        name: userInfo.username,
        id: userInfo.id
      }
      const secret = 'nyan-cat-rainbow' // decryption key
      const token = jwt.sign(userToken, secret) // sign token
      ctx.body = {
        success: true,
        token: token // return token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: 'User does not exit!' // if user does not exit
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}
