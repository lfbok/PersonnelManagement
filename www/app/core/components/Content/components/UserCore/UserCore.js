import React from "react";
import { connect } from "dva";
import { Layout } from 'antd';
import InformationPartSingle from "../Staffdetails/components/InformationPartSingle.js"
const { Content } = Layout;

class UserCore extends React.Component {
    constructor({ core }) {
        super()

    }

     render(){
        let item = this.props.core.protagonist;
     let arr = [
{'title':'基本信息','content':[
{'k':'姓名','value':'name','v':item.name},
{'k':'英文名','value':'englishname','v':item.englishname},
{'k':'民族','value':'nation','v':item.nation},
{'k':'性别','value':'sex','v':item.sex},
{'k':'证件类型','value':'typeid','v':item.typeid},
{'k':'证件号码','value':'idnumber','v':item.idnumber},
{'k':'出生年月','value':'dateofbirth','v':item.dateofbirth},
{'k':'年龄','value':'age','v':item.age},
{'k':'参加工作时间','value':'joininwork','v':item.joininwork},
{'k':'工龄','value':'lengthofservice','v':item.lengthofservice},
{'k':'最高学历','value':'education','v':item.education},
{'k':'国籍','value':'nationality','v':item.nationality},
{'k':'政治面貌','value':'politicalstatus','v':item.politicalstatus},
{'k':'婚姻状况','value':'matrimonialres','v':item.matrimonialres},
{'k':'星座','value':'constellatory','v':item.constellatory},
]},
{'title':'联系方式','content':[{'k':'个人手机','value':'phonenumber','v':item.phonenumber},{'k':'个人邮箱','value':'mail','v':item.mail},{'k':'QQ','value':'qq','v':item.qq},{'k':'微信','value':'wx','v':item.wx},{'k':'现居地','value':'currentaddress','v':item.currentaddress},]}
]


   return <div>
          {arr.map((item,index)=>{
              return <InformationPartSingle key={index} item={item} identity={'admin'}></InformationPartSingle>
              })}
          </div>
        }

}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(UserCore)