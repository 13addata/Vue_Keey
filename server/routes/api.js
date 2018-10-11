const api = require('../controllers/list.js');
const router = require('koa-router')();

router.get('/list/:id', api.getList);
router.post('/list', api.createList);
router.delete('/list/:userId/:id', api.removeList)

module.exports = router;