import React from "react";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { Form, Icon, Input, Button, Checkbox ,Modal } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor({ home, form }) {
        super()
        this.state = {
            name:'',
            pass:'',
            modal2Visible:false
        }
    }
    setModal2Visible(modal2Visible) {
      this.setState({
        ...this.state,
        modal2Visible
         });
    }
    componentWillMount(){
        var str = JSON.parse(localStorage.getItem("name"));
        if(!str) return
        this.setState({
          ...this.state,
            name:str.a,
            pass:str.b
        })
    }
    render() {
      document.title = '同步时代-后台登录'
       var handleSubmit = (e)=>{
        this.props.form.validateFields((err, values) => {
          if(!values.userName) return
          if (!err) {
            this.props.dispatch({'type':'home/login',values})
            if(values.remember){
                localStorage.setItem("name",JSON.stringify({"a":values.userName,"b":values.password}));
            }else if(!values.remember){
                localStorage.removeItem('name');
            }
          }
        });

    }
      var startLogin = ()=>{
        this.setModal2Visible(true)
      }
       const { getFieldDecorator } = this.props.form;
       var self = this;
       console.log(this.state.modal2Visible)
    return (<div>
              <Modal
          title={'登录'}
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          onOk={() =>{ this.setModal2Visible(false),this.props.home.login==1&&this.props.dispatch(routerRedux.push("/core/content/"))}}
          onCancel={() => this.setModal2Visible(false)}
        >
          <p><Icon type={this.props.home.login==1?`smile`:`frown`} />{" "}{this.props.home.login==1?`登陆成功`:`登陆失败！账号或密码错误`}</p>
        </Modal>

        <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
             initialValue: `${this.state.name}`,
             rules: [{ required: true, message: '请输入你的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: `${this.state.pass}`,
            rules: [{ required: true, message: '请输入你的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">找回密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{startLogin()}}>登录</Button>
        </FormItem>

      </Form>
      </div>

    );
    }
}


export default connect(
    ({ home }) => {
        return {
            home
        }
    }
)(Login)