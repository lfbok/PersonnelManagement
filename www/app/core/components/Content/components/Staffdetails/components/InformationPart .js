import React from "react";
import { connect } from "dva";
import InformationPartSingle from "./InformationPartSingle.js"

class InformationPart extends React.Component{
        constructor(){
            super()

        }

   render(){
    var item = this.props.core.Staffdetails;
     var arr = [
{'title':'岗位信息','content':[{'k':'部门','value':'branch','v':item.branch},{'k':'职级','value':'rank','v':item.rank},{'k':'员工性质','value':'employeenature','v':item.employeenature},{'k':'岗位','value':'station','v':item.station},{'k':'工号','value':'jobnumber','v':item.jobnumber}]},
{'title':'联系方式','content':[{'k':'工作手机','value':'phonenumber','v':item.phonenumber},{'k':'企业邮箱','value':'mail','v':item.mail},{'k':'工作座机','value':'workplane','v':item.workplane}]},
{'title':'员工状态','content':[{'k':'状态','value':'Incumbency','v':item.Incumbency},{'k':'司龄','value':'ourage','v':item.ourage},{'k':'转正日期','value':'formaldate','v':item.formaldate},{'k':'入职日期','value':'hiredate','v':item.hiredate},{'k':'试用期','value':'qualifyingperiod','v':item.qualifyingperiod},{'k':'离职日期','value':'Leavetime','v':item.Leavetime}]},
]
   return <div>
          {arr.map((item,index)=>{
              return item.content[0].v&&<InformationPartSingle key={index} item={item}></InformationPartSingle>
              })}
          </div>
        }
}


export default connect(

    ({core})=>{
        return {
            core
        }
    }

    )(InformationPart)