var express = require("express");
var app = express();
var session = require('express-session')
var mongoose = require("mongoose");
var info = require("./controller/info.js");
var user = require("./controller/user.js");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/hr",{useMongoClient: true});


app.use(express.static("./www"))

app.use(session({
  secret: '林枫',
  resave: false,
  saveUninitialized: true
}))


app.post('/addmonthactivity',info.addmonthactivity)//事项
app.post('/addemploy',info.addemploy)//增加员工
app.post('/getAlluser',info.getAlluser)//获得↑
app.post('/sou',info.sou)//搜索
app.post('/edituser',info.edituser)//修改
app.post('/editadmin',info.editadmin)//修改
app.post('/particular',info.particular)//详情页当前角色
app.post('/initTodo',info.initTodo);//intiHOME
app.post('/importUser',info.importUser);//intiHOME
app.get('/a',info.getall)
//
app.post('/login',user.login);//登录验证
app.get('/online',user.online);//是否在线
app.get('/outLgoin',user.outLgoin);
app.get('/cs',user.cs);
app.get('/sss',user.sss);




app.listen(3000,(err)=>{

    err?console.log("端口开启失败"):console.log("开启3000端口成功");
})
