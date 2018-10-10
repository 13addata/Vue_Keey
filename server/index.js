const Koa = require('koa') 
, koaRouter = require('koa-router')
, json = require('koa-json')
, logger = require('koa-logger'); //import dependencies

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

app.on('error', function(err, ctx){
	console.log('server error', err);
});

app.listen(port,() => {
	console.log(`Koa server started. Server is listening on port: ${port}`);
});

module.exports = app;