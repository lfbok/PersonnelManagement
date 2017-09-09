import React from "react";
import { connect } from "dva";
import "./addemploy.less"
import { message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete , DatePicker, TimePicker , Radio} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
var coun = {'title':'证件类型','k':'typeofid','options':['身份证','护照','军官证','士兵证','台胞证','回乡证']}
var quarters = {'title':'岗位','k':'quarters','options':['业务员','前端','后端','设计']}
var trialtime= {'title':'试用期','k':'quarters','options':['无','一个月','两个月','三个月']}
var  options = [];
var sub ={}
const AutoCompleteOption = AutoComplete.Option;
class WrappedRegistrationForm extends React.Component {
  constructor({ core }) {
        super()
        this.state={
             confirmDirty: false,
            autoCompleteResult: []
        }
    }
     componentWillMount(){
          options =  [this.props.core.organizationalstructure]
      }

  render() {
    var displayRender=(value)=>{
            return value[value.length - 1];
          }
    var onChanges = (values)=>{
            sub.branch=values[values.length-1]
        }
   var handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(sub,values)
        this.props.dispatch({'type':'core/addemploy',sub})
        message.success(`添加员工[${values.name}]成功！`);
        this.props.form.setFieldsValue({
        'name': ``,
        'sex': ``,
        'station': ``,
        'qualifyingperiod': ``,
        'phonenumber': ``,
        'employeenature': ``,
        'typeid': ``,
        'idnumber': ``,
        });
      }else{
        message.error('添加失败！');
        console.log('获得表单出问题了')
      }
    });
  }

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
     const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    return (
      <Form  className="addForm" onSubmit={handleSubmit}>
                <Row type="flex" justify="start" className="jiuba">
                <Col span={2}>姓名</Col>
                  <Col span={4}>
                        <FormItem>
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '内容不能为空!', whitespace: true }],
                          })(
                            <Input placeholder="请输入"/>
                          )}
                        </FormItem>
                  </Col>
                  <Col span={2}>性别</Col>
                  <Col span={6}>
                        <FormItem className="sexzdy">
                          {getFieldDecorator('sex')(
                            <RadioGroup>
                              <Radio value="男">男</Radio>
                              <Radio value="女">女</Radio>
                            </RadioGroup>
                          )}
                        </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                <Col span={2}>部门</Col>
                  <Col span={4}>
                        <Cascader
                        placeholder={'请选择'}
                        options={options}
                        expandTrigger="click"
                        displayRender={displayRender}
                        onChange = {onChanges}
                        changeOnSelect={true}/>
                  </Col>
                  <Col span={2}>岗位</Col>
                  <Col span={6}>
                         <FormItem>
                          {getFieldDecorator('station', {
                            rules: [
                              { required: true, message: '内容不能为空!' },
                            ],
                          })(
                            <Select placeholder="请选择">
                              {quarters.options.map((item ,index)=>{
                                return  <Option key={index} value={item}>{item}</Option>
                              })}

                            </Select>
                          )}
                        </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                <Col span={2}>入职日期</Col>
                  <Col span={4}>
                        <FormItem>
                          {getFieldDecorator('hiredate', config)(
                            <DatePicker />
                          )}
                        </FormItem>
                  </Col>
                  <Col span={2}>试用期</Col>
                  <Col span={6}>
                        <FormItem>
                          {getFieldDecorator('qualifyingperiod', {
                            rules: [
                              { required: true, message: '内容不能为空!' },
                            ],
                          })(
                            <Select placeholder="请选择">
                              {trialtime.options.map((item ,index)=>{
                                return  <Option key={index} value={item}>{item}</Option>
                              })}

                            </Select>
                          )}
                        </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                <Col span={2}>工作电话</Col>
                  <Col span={4}>
                        <FormItem>
                          {getFieldDecorator('phonenumber', {
                            rules: [{ required: true, message: '内容不能为空!' }],
                          })(
                            <Input placeholder="请输入" style={{ width: '100%' }} />
                          )}
                        </FormItem>
                  </Col>
                  <Col span={2}>员工性质</Col>
                  <Col span={6}>
                         <FormItem className="sexzdy">
                          {getFieldDecorator('employeenature')(
                            <RadioGroup>
                              <Radio value="全职">全职</Radio>
                              <Radio value="兼职">兼职</Radio>
                              <Radio value="实习">实习</Radio>
                            </RadioGroup>
                          )}
                        </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                <Col span={2}>证件类型</Col>
                  <Col span={4}>
                        <FormItem>
                          {getFieldDecorator('typeid', {
                            rules: [
                              { required: true, message: '内容不能为空!' },
                            ],
                          })(
                            <Select placeholder="请选择">
                              {coun.options.map((item ,index)=>{
                                return  <Option key={index} value={item}>{item}</Option>
                              })}

                            </Select>
                          )}
                        </FormItem>
                  </Col>
                  <Col span={2}>证件号码</Col>
                  <Col span={6}>
                        <FormItem>
                          {getFieldDecorator('idnumber', {
                            rules: [{ required: true, message: '内容不能为空!' }],
                          })(
                            <Input placeholder="请输入" style={{ width: '100%' }} />
                          )}
                        </FormItem>
                  </Col>
                </Row>

        <Button type="primary" htmlType="submit">确定增加</Button>
        </Form>
    );
  }
}

export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(WrappedRegistrationForm)