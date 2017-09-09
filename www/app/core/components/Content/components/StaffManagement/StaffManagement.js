import React from "react";
import { connect } from "dva";
import { Layout , Cascader , Row , Col , Input , Select , Icon , Button} from 'antd';
import Sou from  "./components/sou.js";
import Showuser from "./components/Showuser.js";
const Option = Select.Option;
import "./StaffManagement.less";
var  options = [];
var sub = {}
class UserCore extends React.Component {
    constructor({ core }) {
        super()
        this.state={
          xiaojiujiu: false
        }
    }
      componentWillMount(){
          options =  [this.props.core.organizationalstructure]
      }
    render() {
        var setsub = (k,v)=>{
          if(v=='无') v=undefined
          sub[k]=v
          console.log(sub)
        }
        var displayRender=(value)=>{
            return value[value.length - 1];
          }
        var onChanges = (values)=>{
            sub.branch=values[values.length-1]
        }
        var handleChange  = (value)=> {
          if(value=='无') value=undefined
              sub.Incumbency=value
          }
        var callback = (key)=> {
            console.log(key,3);
          }
        var xiaojiujiu = ()=>{
          this.setState({xiaojiujiu:!this.state.xiaojiujiu})
        }

        var keywords = (e)=>{
          let xz =e.target.value
          if(!xz) xz = undefined
          sub.keywords=xz
        }
        console.log(sub)
        return (
        <div className="xzp">
             <Row type="flex" justify="start">
                  <Col span={2} className="line-h">
                    <span>部门：</span>
                </Col>
                <Col span={3}>
                      <Cascader
                        placeholder={'请选择'}
                        options={options}
                        expandTrigger="hover"
                        displayRender={displayRender}
                        onChange = {onChanges}
                        changeOnSelect={true}
                         className="gjz"
                      />
                </Col>
                <Col span={2} className="line-h">
                  <span>关键字：</span>
                </Col>
                <Col span={3}>
                     <Input className="gjz" onChange={(e)=>{keywords(e)}} placeholder="姓名/手机/证件号" />
                </Col>
                <Col span={2} className="line-h">
                <span>在职状态：</span>
                </Col>
                <Col span={3}>
                      <Select
                      className="gjz"
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="请选择"
                        onChange={handleChange}>
                        <Option value="待入职">待入职</Option>
                        <Option value="试用期">试用期</Option>
                        <Option value="正式">正式</Option>
                        <Option value="待离职">待离职</Option>
                        <Option value="离职">离职</Option>
                        <Option value="无">无</Option>
                      </Select>
                </Col>
                <Col span={4}>
                    <div onClick={xiaojiujiu} className="more">更多{this.state.xiaojiujiu?<Icon type="caret-down" />:<Icon type="caret-up" />}</div>
                      <Button className="sou" onClick={()=>{this.props.dispatch({'type':"core/sou",'sub':sub,'page':this.props.core.page,'pagesize':this.props.core.pagesize})}} type="primary" icon="search">查询</Button>
                </Col>
              </Row>
              {this.state.xiaojiujiu?<Sou setsub={setsub}></Sou>:''}
              <Showuser></Showuser>
        </div>
          )
    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(UserCore)