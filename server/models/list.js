const db = require('../config/db.js'), 
      listModel = '../schema/list.js';
const NavDb = db.Nav;

const List = NavDb.import(listModel); 

const getListById = async function (id) {
  const list = await List.findAll({ // find all todolist
    where: {
      user_id: id
    },
    attributes: ['id', 'item_name', 'item_link', 'item_icon', 'group'] // returns 'id', 'item_name', 'item_link', 'item_icon', 'group'
  })

  return list
}

const createList = async function (data) {
  await List.create({
    user_id: data.id,
    item_name: data.itemName,
    item_link: data.itemLink,
    item_icon: data.itemIcon,
    group: data.group
  })    // user_id: data.id, ==> where user_id is the key in db, data is from api
  return true
}

const removeList = async function (id, userId) {
  const result = await List.destroy({
    where: {
      id,
      user_id: userId
    }
  }) 
  return true
}


module.exports = {
  getListById,
  createList,
  removeList
}
