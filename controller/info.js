var userInfo = require('../model/employeeinfo.js');
var user = require("../model/user.js");
var department = require("../model/organizationalstructure.js");
var monthactivity = require("../model/monthactivity.js");
var formidable = require("formidable");
var template = {
                branch: '部门',
                name: '姓名',
                sex: '性别',
                station: '岗位',
                hiredate: '入职时间',
                Incumbency: '在职状态',
                phonenumber: '手机号码',
                employeenature: '员工性质',
                typeid: '证件类型',
                idnumber: '证件号',
                rank: '职位',
                jobnumber: '工号',
                qualifyingperiod: '试用期时长',
                ourage: '司龄',
                formaldate:'转正日期',
                Leavetime: '离职日期',
                joininwork: '参加工作年限',
                lengthofservice: '工龄',
                education: '最高学历',
                permanentaddress: '户籍地址',
                matrimonialres: '婚姻状况',
                currentaddress: '现居住地',
                constellatory : '星座',
                politicalstatus:'政治面貌',
                mail:'企业邮箱',
                workplane:'工作座机',
                englishname:'英文名',
                nation:'民族',
                dateofbirth:'出生年月',
                age:'年龄',
                nationality:'国籍',
                qq         :'QQ',
                wx         :'微信',
                personalmobile:'个人手机'
        }
exports.addmonthactivity = (req,res)=>{
 var form = new formidable.IncomingForm();
    form.parse(req,(err,data)=>{
        monthactivity.find((err,docs)=>{
              var ss = new monthactivity({
                  "date":data.date,
                  "listData":[
                       JSON.stringify({ type:data.mold, content: data.substance })
                  ]
              })
              ss.save((err)=>{
                res.send({'result':1})
              })
            })
    })
},

exports.addemploy = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,sub)=>{
        let a = sub.hiredate.split('T')[0].split('-')
        let b = a[0]+'-'+parseInt(a[1])+'-'+parseInt(a[2])
        var ustemplate = sub
        ustemplate.hiredate = b
        let yu = {
             rank: '',//职位
            jobnumber: '', //工号
            Incumbency: '试用期',
            ourage: "", // 司龄
            formaldate:'' , //转正日期
            Leavetime: '', //离职日期
            joininwork: '', //参加工作年限
            lengthofservice: "", //工龄
            education: "", //最高学历
            permanentaddress: "", //户籍地址
            matrimonialres: "未婚", //婚姻状况
            currentaddress: "",  // 现居住地
            constellatory : '',//星座
            politicalstatus:'无党派',//政治面貌
            mail:'',//企业邮箱
            workplane:'',//工作座机
            englishname:'',//英文名
            nation:'',//民族
            dateofbirth:'',//出生年月
            age:'',//年龄
            nationality:'',//国籍
            qq         :'',
            wx         :'',
            personalmobile:''
            }
        let sum;
        switch(ustemplate.qualifyingperiod){
            case '无':
                sum = 0
                break;
            case '一个月':
                sum = 1
                break;
            case '两个月':
                sum = 2
                break;
            case '三个月':
                sum = 3
            default :
            0
        }
        let shijian = new Date(ustemplate.hiredate).getTime()+30*sum*24*60*60*1000
        let days = new Date(shijian)
        let xformaldate = (days.getFullYear()||'')+'-'+(days.getMonth()+1||'')+'-'+(days.getDate()||'')

        yu.formaldate = xformaldate
        Object.assign(ustemplate,yu)
        var info = new userInfo(ustemplate)
        info.save((err,result)=>{
            if(!err){
                res.send({'result':1,'data':result})
            }else{
                console.log("员工存入错误")
            }

        })

    })
}


exports.getAlluser = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,can)=>{
        var result;
        var allLength;
        userInfo.find(can.sub,(err,data)=>{
            if(!err){
                allLength = data.length
            }else{
                console.log('查找员工数据失败')
            }
        userInfo.find(can.sub).skip((can.page-1)*can.pagesize).limit(can.pagesize).exec((err,docs)=>{
            if(!err){
                result = docs
                res.send({result,allLength})
            }else{
                console.log('查找员工数据失败')
            }
        });
        });
    })
}

exports.sou = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,sub)=>{
        var clonesub = sub.sub.keywords;
        if(sub.sub.keywords) sub.sub.keywords=undefined
        userInfo.find(sub.sub,(err,data)=>{
            if(!err){
                var result = data.filter((item)=>{
                    var na =new RegExp(clonesub);
                    return na.test(item.name)||na.test(item.phonenumber)||na.test(item.idnumber)
                })
                var result2 = result.slice(sub.page-1,sub.pagesize)
                res.send({'result':result2,'allLength':result.length})
            }else{
                console.log('筛选错误')
            }

        })
    })

}


exports.edituser = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req,(err,editnext)=>{
        var a = JSON.parse(editnext.editnext).content
        if(!a[0].v){
            res.send({'result':-1})
            return
        }
        userInfo.find({'_id':editnext.id},(err,docs)=>{
           var b = docs[0];
           a.map((item)=>{
            b[item.value]=item.v
           })
           b.save((err,result)=>{
            if(!err){
                res.send(result)
            }else{
                console.log("修改错误")
            }
           })

        })
    })
}

exports.editadmin = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req,(err,editnext)=>{
        var a = JSON.parse(editnext.editnext).content
        if(!a[0].v){
            res.send({'result':-1})
            return
        }
        user.find({'_id':editnext.id},(err,docs)=>{
           var b = docs[0];
           a.map((item)=>{
            b[item.value]=item.v
           })
           b.save((err,result)=>{
            if(!err){
                res.send(result)
            }else{
                console.log("修改错误")
            }
           })

        })
    })
}

exports.particular = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req,(err,idnumber)=>{
        userInfo.find({'_id':idnumber.id},(err,docs)=>{
            if(!err){
                    res.send(docs[0])
            }else{
                console.log('查询失败'+idnumber.id)
            }
        })
    })
}

exports.importUser = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req,(err,{users})=>{
        if(!users) return
            var result;
        users.map((item,index)=>{
           let resuv =  item.入职时间.split("\"")[1]
           var personal = new userInfo({
                branch:item.部门||' ',
                name: item.姓名||' ',
                sex: item.性别||' ',
                station: item.岗位||' ',
                hiredate: resuv||' ',
                qualifyingperiod: item.试用期时长||' ',
                phonenumber: item.工作手机||' ',
                employeenature: item.员工性质||' ',
                typeid: item.证件类型||' ',
                idnumber: item.证件号||' ',
                rank: item.职位||' ',
                jobnumber: item.工号||' ',
                Incumbency: item.在职状态||' ',
                ourage: item.司龄||' ',
                formaldate:item.转正日期||' ',
                Leavetime: item.离职日期||' ',
                joininwork: item.参加工作年限||' ',
                lengthofservice: item.工龄||' ',
                education: item.最高学历||' ',
                permanentaddress: item.户籍地址||' ',
                matrimonialres: item.婚姻状况||' ',
                currentaddress: item.现居住地||' ',
                constellatory : item.星座||' ',
                politicalstatus:item.政治面貌||' ',
                mail:item.企业邮箱||' ',
                workplane:item.工作座机||' ',
                englishname:item.英文名||' ',
                nation:item.民族||' ',
                dateofbirth:item.出生年月||' ',
                age:item.年龄||' ',
                nationality:item.国籍||' ',
                qq         :item.QQ||' ',
                wx         :item.微信||' ',
                personalmobile:item.个人手机||' '
           })
           personal.save((err,docs)=>{
            if(!err&&index>=users.length-1){
                    Tcallback()
            }
        })
        })
        var Tcallback = ()=>{
            userInfo.find((err,data)=>{
            if(!err){
                    result=data.length
                    res.send({'result':result})
                }
            })
        }

    })
}

exports.initTodo = (req,res)=>{
       userInfo.find((err,docs)=>{
            res.send({result:1})
       })
}
exports.getall = (req,res)=>{
    monthactivity.find((err,docs)=>{
        res.json(docs)
    })
}

