var mongoose = require("mongoose");

var InfoSchema = new mongoose.Schema({
                branch: String,
                name: String,
                sex: String,
                station: String,
                hiredate: String,//入职时间
                qualifyingperiod: String,
                phonenumber: Number,
                employeenature: String,
                typeid: String,
                idnumber: String,
                rank: String,//职位
                jobnumber: String, //工号
                Incumbency: String,//shiyongqi
                ourage: String, // 司龄
                formaldate:String , //转正日期
                Leavetime: String, //离职日期
                joininwork: String, //参加工作年限
                lengthofservice: String, //工龄
                education: String, //最高学历
                permanentaddress: String, //户籍地址
                matrimonialres: String, //婚姻状况
                currentaddress: String,  // 现居住地
                constellatory : String,//星座
                politicalstatus:String,//政治面貌
                mail:String,//企业邮箱
                workplane:String,//工作座机
                englishname:String,//英文名
                nation:String,//民族
                dateofbirth:String,//出生年月
                age:String,//年龄
                nationality:String,//国籍
                qq         :String,//QQ
                wx         :String //微信
});

var userInfo = mongoose.model("userinfos",InfoSchema);

module.exports = userInfo;