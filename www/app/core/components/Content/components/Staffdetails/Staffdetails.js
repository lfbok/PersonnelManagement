import React from "react";
import { connect } from "dva";
import classNames from "classnames"
import { Avatar, Button , Row , Col, Menu , Dropdown, Icon , Tabs , Progress} from 'antd';
import "./Staffdetails.less";
import InformationPart from "./components/InformationPart .js";
import Personaldetails from "./components/Personaldetails.js"
const TabPane = Tabs.TabPane;
var handleMenuClick=(e)=> {
        console.log('click', e);
     }
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">通知员工完善信息</Menu.Item>
  </Menu>
);
class Staffdetails extends React.Component{
        constructor({params}){
            super()
        }

        componentWillMount(){
            this.props.params.id&&this.props.dispatch({'type':'core/particular','idnumber':this.props.params.id})
        }
        render(){
          console.log(Object.values(this.props.core.Staffdetails))
              var arrNot = Object.values(this.props.core.Staffdetails).filter((item)=>{
                return item !=" "&&item!='';
              })
              console.log(arrNot)
              var arrAll = Object.keys(this.props.core.Staffdetails).length;
              var already = parseInt(100/arrAll*arrNot.length)
            return <div className="Staffdetails">
                <div>
                 <Row>
                  <Col span={10}>
                        <Row type="flex" justify="start">
                          <Col span={8}>
                            {this.props.core.Staffdetails.qq?
                              <div className="thisuser"><img className={classNames({"thisuser" : true , "i1" :this.props.core.Staffdetails.sex=='男' , "i2" : this.props.core.Staffdetails.sex=='女'})} src={`http:\/\/q2.qlogo.cn/headimg_dl?bs=${this.props.core.Staffdetails.qq}&dst_uin=${this.props.core.Staffdetails.qq}&src_uin=${this.props.core.Staffdetails.qq}&fid=${this.props.core.Staffdetails.qq}&spec=100&url_enc=0&referer=bu_interface&term_type=PC`} /></div>
                              :
                              <Avatar className={classNames({"thisuser" : true , "c1" :this.props.core.Staffdetails.sex=='男' , "c2" : this.props.core.Staffdetails.sex=='女'})}>{this.props.core.Staffdetails.name}</Avatar>
                            }
                          </Col>
                          <Col  span={4}>
                            <p className="thisname">{this.props.core.Staffdetails.name}</p>
                            <p className="thisname">{this.props.core.Staffdetails.employeenature}</p>
                          </Col>
                          <Col span={4}>
                            <p className="thisname">{this.props.core.Staffdetails.branch}</p>
                            <p className="thisname">{this.props.core.Staffdetails.Incumbency}</p>
                          </Col>
                          <Col span={8}>
                            <p className="thisname"></p>
                            <p className="thisname">入职时间：{this.props.core.Staffdetails.hiredate}</p>
                          </Col>
                        </Row>
                  </Col>
                  <Col span={7} offset={7}>
                      <span className="integrity">资料完整度：</span><Progress type="circle" percent={already} />
                  </Col>
                </Row>
                </div>
                <div className="zhuanzheng">
                    <Button type="primary">转正变更</Button>
                    <Button type="primary">办理离职</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多 <Icon type="down" />
                      </Button>
                    </Dropdown>
                </div>
                <div className="StaffdetailsNav">
                    <Tabs defaultActiveKey="1">
                      <TabPane tab={<span>工作</span>} key="1">
                        <InformationPart></InformationPart>
                      </TabPane>
                      <TabPane tab={<span>个人</span>} key="2">
                        <Personaldetails></Personaldetails>
                      </TabPane>
                      <TabPane tab={<span>合同</span>} key="3">
                        开发中...
                      </TabPane>
                    </Tabs>
                </div>
            </div>
        }
}


export default connect(

    ({core})=>{
        return {
            core
        }
    }

    )(Staffdetails)