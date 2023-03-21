const moment = require('moment');
const NodeRSA = require('node-rsa')
let Mysql_student = require('./tools/applyMysql');

const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
// 创建koa的实例app
const app = new Koa();
let appMysql = new Mysql_student();

var router = new Router();

router.post('/rms/password',async(ctx)=>{
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let sql_key = `select public,private from rms.RSA where type = 'login'`;
    //let result = await appMysql.dbop(sql_key);
    //console.log("result = ",result);
    //let key = new NodeRSA(result[0].public); 
    let sql_get_password = `select pwd from rms.user where username = '${Body.name}'`;
    let passwd = await appMysql.dbop(sql_get_password);
    if(passwd.length == 0)
    {
        ctx.body = 1;
        return;
    }
    //let rawText = key.decryptPublic(passwd[0].password,'utf8');
    console.log(passwd);
    let rawText = passwd[0].pwd;
    console.log(rawText);
    if(Body.password == rawText)
    {
        ctx.body = 0;
        return;
    }
    else
    {
        ctx.body = 1;
    }
    ctx.body = 1;
    
})

router.get('/rms/select',async (ctx) =>{
    console.log(ctx.request.body);
    let sql = 'select * from test.student'; //
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    //console.log('result = ',a);
    ctx.body = a;

})

router.post('/rms/add',async(ctx)=>{
    console.log(ctx.request.body);
    let body = ctx.request.body;
    let sql = `insert into test.student(name,age,city,area,address,mail)
    values('${body.name}','${body.age}','${body.city}','${body.area}','${body.address}','${body.mail}')`;

    try{
        await appMysql.dbop(sql,null);
        
        ctx.body = 0;
    }catch (error){
        ctx.body = 1;
    }
    
    
})


router.post('/rms/delete',async(ctx)=>{
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let name = Body.studentName;
    let sql = `delete from test.student where name = '${name}'`;
    try{
        await appMysql.dbop(sql,null);
        ctx.body =0;
    }catch (error) {
        ctx.body =1;
    }
})

router.post('/rms/update',async(ctx)=>{
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let name = Body.Data.name;
    let age = Body.Data.age;
    let city = Body.Data.city;
    let area = Body.Data.area;
    let address = Body.Data.address;
    let mail = Body.Data.mail;
    let getsql = `select count(*) as count from test.student where name = '${name}'`;
    let result = await appMysql.dbop(getsql,null);
    
    let count = result[0].count;
    console.log("count = ",count);
    let sql = '';
    if(count == 0)
    {
        sql = `insert into test.student(name,age,city,area,address,mail)
        values('${name}','${age}','${city}','${area}','${address}','${mail}')`;
    }
    else
    {
        sql = `update test.student set age = '${age}',city ='${city}',area='${area}',address='${address}',
        mail = '${mail}'
        where name = '${name}'`;
    }
    console.log("sql =  ",sql);
    try{
        await appMysql.dbop(sql,null);
        if(count == 0)
        {
            ctx.body = 0;
        }
        else
        {
            ctx.body = 1;
        }
    }catch(error) {
        ctx.body = -1;
    }
    console.log("返回值为",ctx.body);
})

app.use(bodyParser());
app.use(cors());  //跨域
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(3000, () => {
    console.log("服务器已启动，http://localhost:3000");
})
