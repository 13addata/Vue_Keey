const auth = require('../controllers/user.js'); 
const router = require('koa-router')();

router.get('/user/:id', auth.getUserInfo); // url hostname/auth/user/id/#
router.post('/user', auth.postUserAuth);

module.exports = router;