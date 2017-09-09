import React from "react";
import { connect } from "dva";
import { Layout , Cascader , Row , Col , Input , Select , Icon , Button} from 'antd';
const { Content } = Layout;
import './sou.less'
const Option = Select.Option;
var title = [
{'title':'员工性质','k':'employeenature','options':['全职','兼职','实习','无']},
{'title':'职级','k':'rank','options':['经理','无']},
{'title':'学历','k':'education','options':['初中及以下','高中','中专','大专','本科','硕士','研究生','无']},
{'title':'性别','k':'sex','options':['男','女','无']},
{'title':'婚姻状况','k':'matrimonialres','options':['已婚','未婚','离异','无']},
{'title':'星座','k':'constellatory','options':['水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','无']},
{'title':'证件类型','k':'typeid','options':['身份证','护照','军官证','士兵证','台胞证','回乡证','无']},
{'title':'政治面貌','k':'politicalstatus','options':['中共党员','民族党派','共青团员','群众','无党派','无']},
]

class Sou extends React.Component {
    constructor({ core , setsub}) {
        super()

    }
    render() {
        var handleChange  = (a,b)=> {
              this.props.setsub(b,a)
          }
          if(title.length>8) return <div>EOF</div>
        return <div className="sousou">
                   <Row type="flex" justify="start">
                      <Col className="xzmar" span={2}>
                          {title[0].title}
 ：                     </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[0].k)}}>
                            {title[0].options.map((item , index)=>{
                               return <Option key={index}  value={item}>{item}</Option>
                                })}
                         </Select>
                   </Col>
                   <Col className="xzmar" span={2}>
                          {title[1].title}
 ：                     </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[1].k)}}>
                            {title[1].options.map((item , index)=>{
                                return <Option key={index}  value={item}>{item}</Option>
                             })}
                         </Select>
                   </Col>
                   <Col className="xzmar" span={2}>
                            {title[2].title}：
                      </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[2].k)}}>
                            {title[2].options.map((item , index)=>{
                                return <Option key={index}  value={item}>{item}</Option>
                             })}
                         </Select>
                   </Col>
                   <Col className="xzmar" span={2}>
                          {title[3].title}
 ：                     </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[3].k)}}>
                            {title[3].options.map((item , index)=>{
                                return <Option key={index}  value={item}>{item}</Option>
                             })}
                         </Select>
                   </Col>
              </Row>
              <Row type="flex" justify="start">
                     <Col className="xzmar" span={2}>
                        {title[4].title}
   ：                   </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[4].k)}}>
                            {title[4].options.map((item , index)=>{
                                return <Option key={index}  value={item}>{item}</Option>
                             })}
                         </Select>
                   </Col>
                   <Col className="xzmar" span={2}>
                            {title[5].title}：
                      </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[5].k)}}>
                                {title[5].options.map((item , index)=>{
                                   return <Option key={index}  value={item}>{item}</Option>
                                })}
                         </Select>
                   </Col>
                   <Col className="xzmar" span={2}>
                            {title[6].title}：
                      </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[6].k)}}>
                            {title[6].options.map((item , index)=>{
                                return <Option key={index}  value={item}>{item}</Option>
                             })}
                         </Select>
                   </Col>
                   <Col className="xzmar" span={2}>
                            {title[7].title}：
                      </Col>
                      <Col className="xzmar" span={3}>
                         <Select
                         style={{width:'100%'}}
                           showSearch
                           placeholder="请选择"
                           onChange={(a,b)=>{handleChange(a,title[7].k)}}>
                           {title[7].options.map((item , index)=>{
                                return <Option key={index}  value={item}>{item}</Option>
                             })}
                         </Select>
                   </Col>
              </Row>
        </div>



    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(Sou)