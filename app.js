const koa = require("koa");
const router = require("koa-router")();
const render = require("koa-art-template");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const sd = require("silly-datetime");
const jsonp = require("koa-jsonp");
const cors = require("koa2-cors");

const app = new koa();
//配置post提交数据的中间件
app.use(bodyParser());
app.use(jsonp());
app.use(cors());
//配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
    dateFormat: dateFormat = function (value) {
        return sd.format(value, "YYYY-MM-DD HH:mm")
    }
});


//
const api = require("./routes/api.js");

router.use("/api/v1", api);

app.use(router.routes());
app.use(router.allowedMethods);
app.listen(3000);



