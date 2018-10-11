const Koa = require('koa') 
, koaRouter = require('koa-router')
, json = require('koa-json')
, logger = require('koa-logger') //import dependencies
, auth = require('./routes/auth.js')      // import /auth
, api = require('./routes/api.js') // import api
, jwt = require('koa-jwt');

const app = new Koa();
const router = new koaRouter();


// let port = process.env.PORT
let port = 8889

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async function (ctx, next) {
	let start = new Date()
	await next()
	let ms = new Date() - start
	console.log('%s %s - %s', ctx.method, ctx.url, ms)
});

app.use(async function (ctx, next) {  //  return error info if token verification fail
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource!'
      }
    } else {
      throw err
    }
  }
});

app.on('error', function(err, ctx){
	console.log('server error', err);
});

router.use('/auth', auth.routes()); //mount on koa-router, add /auth on url when any request from auth
router.use("/api",jwt({secret: 'nyan-cat-rainbow'}),api.routes());

app.use(router.routes());

app.listen(port,() => {
	console.log(`Koa server started. Server is listening on port: ${port}`);
});

module.exports = app;