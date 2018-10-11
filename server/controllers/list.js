const list = require('../models/list.js');

const getList = async function (ctx) {
  const id = ctx.params.id
  const result = await list.getListById(id)
  ctx.body = {
    success: true,
    result // put result in body
  }
}

const createList = async function (ctx) {
  const data = ctx.request.body
  const success = await list.createList(data)
  ctx.body = {
    success
  }
}

const removeList = async function (ctx) {
  const id = ctx.params.id
  const userId = ctx.params.userId
  const success = await list.removeList(id, userId)

  ctx.body = {
    success
  }
}

module.exports = {
  getList,
  createList,
  removeList
}
