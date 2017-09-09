var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
        userName: String,
        password:String,
        role: Number,
        emailsum: Number,
        userPhotoUrl: String,
        branch: String,
        name: String,
        sex: String,
        station: String,
        hiredate: String,
        qualifyingperiod: String,
        phonenumber: String,
        employeenature: String,
        typeid: String,
        idnumber: String,
        rank: String,//职位
        jobnumber: String, //工号
        Incumbency: String,
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
        qq       :String,
        personalmobile:String
});

var user = mongoose.model("users",userSchema);

module.exports = user;