var userInfo = require('../model/employeeinfo.js');
var user = require("../model/user.js");
var department = require("../model/organizationalstructure.js");
var monthactivity = require("../model/monthactivity.js");
var formidable = require("formidable");


exports.cs = function(req,res){
    var monthactivitys = new monthactivity({
         "email":'email'
    })
    monthactivitys.save((err)=>{
        if(!err){
            console.log('ok')
        }
    })
monthactivity.find(function(err,data){
        console.log(data)
      })
}
