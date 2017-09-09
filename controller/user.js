var userInfo = require('../model/employeeinfo.js');
var user = require("../model/user.js");
var department = require("../model/organizationalstructure.js");
var monthactivity = require("../model/monthactivity.js");
var formidable = require("formidable");
var Mock = require('mockjs')
var Random = Mock.Random

exports.login = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,values)=>{
        user.find({'userName':values.userName},(err,docs)=>{
                if(!err){
                    var data = docs[0]
                    if(!data){
                        res.send({result:-1})
                        return
                    }
                if(data.password == values.password){
                    req.session.login = true;
                    req.session.users = values.userName//admin
                    res.send({result:1,data})
                }else{
                    res.send({result:-1})
                }
            }else{
                res.send({result:-1})
            }
        })
    })
}

exports.online = (req,res)=>{
    if(!req.session.login){
        res.send({result:-1})
        return
    }
    user.find({'userName':req.session.users},(err,docs)=>{
            if(!err){
                res.send({result:1,data:docs[0]})
            }
    })
}


exports.outLgoin = (req,res)=>{
    req.session.login=false
    res.send({result:1})
}
exports.cs = (req,res)=>{
        for (var i = 1; i < 1000; i++) {
            var data = Mock.mock({
    'name':Random.cname(),
    'sex|1': ["男","女"],
    'branch|1': ["本公司","IT部","业务","金融事业","事业子级","业务子级","业务下"],
    'station|1': ["前端","后端","业务","美工","产品"],
    'hiredate':Random.natural(2010, 2017)+"-"+Random.natural(1, 12)+"-"+Random.natural(1, 30),
    'qualifyingperiod|1': ["无","一个月","两个月","三个月"],
    'phonenumber|13000000000-13300000000': 13000000001,
    'employeenature|1':["全职","兼职","实习"],
    'typeid|1':["身份证","护照","军官证","士兵证","台胞证","回乡证"],
    'idnumber|100000000000000000-500000000000000000': 1000000000000000001,
    'rank|1':['经理',"员工"],
    'jobnumber|+1':100000,
    'Incumbency|1': ["试用期","待入职","正式","待离职","离职"],
                ourage: " ", // 司龄
                formaldate:" " , //转正日期
                Leavetime: " ", //离职日期
                joininwork: " ", //参加工作年限
                lengthofservice: " ", //工龄
                'education|1': ["初中及以下","高中","中专","大专","本科","硕士","研究生"], //最高学历
                permanentaddress: " ", //户籍地址
                'matrimonialres|1': ["已婚","未婚"], //婚姻状况
                currentaddress: " ",  // 现居住地
                'constellatory|1': ['水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座'],
                politicalstatus:" ",//政治面貌
                mail:" ",//企业邮箱
                workplane:" ",//工作座机
                englishname:" ",//英文名
                nation:" ",//民族
                dateofbirth:" ",//出生年月
                age:" ",//年龄
                nationality:" ",//国籍
                qq         :" ",//QQ
                wx         :" "
})


var a = new userInfo(data)
a.save((err)=>{
    console.log("ok")
})
        };
}

exports.sss = (req,res)=>{
    var a = new user({
        userName: 'admin',
        password:'admin',
        role: 1,
        emailsum: 100,
        userPhotoUrl: '',
        branch: '',
        name: '林枫admin',
        sex: '男',
        station: "",
        hiredate: "",
        qualifyingperiod: "",
        phonenumber: "",
        employeenature: "",
        typeid: "",
        idnumber: "",
        rank: "",//职位
        jobnumber: "", //工号
        Incumbency: "",
        ourage: "", // 司龄
        formaldate:"" , //转正日期
        Leavetime: "", //离职日期
        joininwork: "", //参加工作年限
        lengthofservice: "", //工龄
        education: "", //最高学历
        permanentaddress: "", //户籍地址
        matrimonialres: "", //婚姻状况
        currentaddress: "",  // 现居住地
        constellatory : "",//星座
        politicalstatus:"",//政治面貌
        mail:"",//企业邮箱
        workplane:"",//工作座机
        englishname:"",//英文名
        nation:"",//民族
        dateofbirth:"",//出生年月
        age:"",//年龄
        nationality:"",//国籍
        qq       :"330042626"
    })
    a.save((err)=>{
        res.send("添加管理员成功")
    })
}