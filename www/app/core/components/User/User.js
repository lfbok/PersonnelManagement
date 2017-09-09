import React from "react";
import { connect } from "dva";
import { routerRedux , Link} from 'dva/router';
import { Layout, Menu, Icon , Avatar} from 'antd';
import "./User.less";
const { Header, Content, Footer, Sider } = Layout;
class User extends React.Component {
    constructor({ core }) {
        super()
        this.state = {
              color: '#3498db',
            };
    }

    render() {
      document.title="同步时代员工管理系统"
        return  (
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
    <div className="userPhoto">
        {this.props.core.protagonist.qq?<div className="userPhotoUrl"><img src={`http:\/\/q2.qlogo.cn/headimg_dl?bs=${this.props.core.protagonist.qq}&dst_uin=${this.props.core.protagonist.qq}&src_uin=${this.props.core.protagonist.qq}&fid=${this.props.core.protagonist.qq}&spec=100&url_enc=0&referer=bu_interface&term_type=PC`}/></div>:<Avatar style={{ backgroundColor: this.state.color }} size="large">{this.props.core.protagonist.name}</Avatar>}
    </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">个人首页</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text" onClick={()=>{this.props.dispatch(routerRedux.push("/core/content/UserCore"))}}>我的档案</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text" onClick={()=>{this.props.dispatch(routerRedux.push("/core/content/Email"))}}>内部邮箱</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="bar-chart" />
          <span className="nav-text" onClick={()=>{this.props.dispatch(routerRedux.push("/core/content/security"))}}>安全中心</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="cloud-o" />
          <span className="nav-text" onClick={()=>{this.props.dispatch(routerRedux.push("/core/content/MailList"))}}>通讯录</span>
        </Menu.Item>
      </Menu>
    </Sider>

          )

    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(User)