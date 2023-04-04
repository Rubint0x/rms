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
//-----------------------------------------------------------------
//用户登录
router.post('/rms/login',async(ctx)=>{
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    //let sql_key = `select public,private from rms.RSA where type = 'login'`;
    //let result = await appMysql.dbop(sql_key);
    //console.log("result = ",result);
    //let key = new NodeRSA(result[0].public); 
    let sql_get_password = `select pwd, type from rms.user where username = '${Body.name}'`;
    let usrinfo_from_db = await appMysql.dbop(sql_get_password);
    if(usrinfo_from_db.length == 0)
    {
        ctx.body = 1;
        return;
    }
    //let rawText = key.decryptPublic(passwd[0].password,'utf8');
    console.log("usrinfo_from_db = ", usrinfo_from_db);
    let rawText = usrinfo_from_db[0].pwd;
    let is_admin = usrinfo_from_db[0].type;
    if(Body.password == rawText)
    {
        if(is_admin == 0) ctx.body = 2;
        if(is_admin == 1) ctx.body = 1;
        return;
    }
    else
    {
        ctx.body = 0;
    }
    ctx.body = 0;
    
})

//-----------------------------------------------------------------
//获取桌台信息
router.post('/rms/get_table',async(ctx)=>{       

    let sql = 'select * from tablee'; //
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    //console.log('result = ',a);
    ctx.body = a;
})
//添加桌台
router.post('/rms/add_table',async(ctx)=>{      
    console.log(ctx.request.body);
    let body = ctx.request.body;
    let sql = `insert into rms.tablee(type,state)
    values('${body.type}','0')`;

    try{
        await appMysql.dbop(sql,null);
        
        ctx.body = 0;
    }catch (error){
        ctx.body = 1;
    }
})
//删除桌台
router.post('/rms/del_table',async(ctx)=>{      
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let t_id = Body.name;
    let sql = `delete from rms.tablee where t_id = ${t_id}`;
    let sql1 = `ALTER TABLE rms.tablee AUTO_INCREMENT =1;`;
    try{
        await appMysql.dbop(sql,null);
        await appMysql.dbop(sql1,null);
        ctx.body =0;
    }catch (error) {
        ctx.body =1;
    }
})
//开台
router.post('/rms/open_table',async(ctx)=>{     
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let sql = `update tablee set state = 1 where t_id = ${Body.table}`;
    let sql1 = `insert into orderr(t_id,date)values(${Body.table},NOW())`;
    try{
        await appMysql.dbop(sql,null);
        await appMysql.dbop(sql1,null);
        ctx.body =0;
    }catch (error) {
        ctx.body =1;
    }
})
//结账
router.post('/rms/over_order',async(ctx)=>{   
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let o_id = Body.name;
    let t_id = Body.table;
    let date = Body.date;
    let sql = `update orderr set statue = 1 where o_id = ${o_id}`;
    let sql1 = `update tablee set state = 0 where t_id = ${t_id}`;
    try{
        await appMysql.dbop(sql,null);
        await appMysql.dbop(sql1,null);
        ctx.body =0;
    }catch (error) {
        ctx.body =1;
    }
})

//-----------------------------------------------------------------
//获取订单信息
router.post('/rms/get_order',async(ctx)=>{       
    let sql =  'select * from orderr'; 
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);
    ctx.body = a;
})
//获取订单详细信息
router.post('/rms/get_order_detail',async(ctx)=>{       
    let Body = ctx.request.body;
    console.log("Body = ",Body);
    let o_id = Body.name;
    let sql = `select f_name, count, cost from order_detail natural join food where o_id = ${o_id}`;
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);
    ctx.body = a;
})

router.post('/rms/put_menu_select',async(ctx)=>{       
    let body = ctx.request.body;
    console.log("Body = ",body);
    let sql = `insert into rms.order_detail(o_id,f_id,count)
    values('${body.o_id}','${body.f_id}','${body.count}')`;
    try{
        await appMysql.dbop(sql,null);
        ctx.body =0;
    }catch (error) {
        ctx.body =1;
    }
})

//-----------------------------------------------------------------
//获取用户信息
router.post('/rms/get_user',async(ctx)=>{       

    let sql = 'select u_id, username, type from user'; //
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    console.log('result = ',a);
    ctx.body = a;
})

//-----------------------------------------------------------------
//获取菜单信息
router.post('/rms/get_food',async(ctx)=>{       
    let sql = 'select f_id, ty_name, f_name, price from food natural join food_type';
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    ctx.body = a;
})

//获取食物种类信息
router.post('/rms/get_food_type',async(ctx)=>{       
    let sql = 'select ty_id, ty_name from food_type';
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    ctx.body = a;
})

router.post('/rms/get_food_name',async(ctx)=>{   
    let Body = ctx.request.body;    
    let t_id =Body.id;
    let sql = `select f_name from food where f_id = ${t_id}`;
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    ctx.body = a;
})
//-----------------------------------------------------------------
router.get('/rms/select',async (ctx) =>{
    console.log(ctx.request.body);
    let sql = 'select * from rms.student'; //
    let sqlParam = [];
    let a = await appMysql.dbop(sql,sqlParam);

    //console.log('result = ',a);
    ctx.body = a;

})

router.post('/rms/add_user',async(ctx)=>{
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

router.post('/rms/add_food_type',async(ctx)=>{
    console.log(ctx.request.body);
    let body = ctx.request.body;
    let sql = `insert into rms.food
    values('${body.type}','${body.name}','${body.price}')`;

    try{
        await appMysql.dbop(sql,null);
        ctx.body = 0;
    }catch (error){
        ctx.body = 1;
    }
    
    
})

router.post('/rms/add_tablee',async(ctx)=>{
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

router.post('/rms/add_orderr',async(ctx)=>{
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

router.post('/rms/add_order_detail',async(ctx)=>{
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
