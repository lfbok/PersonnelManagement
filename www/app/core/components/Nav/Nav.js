import React from "react";
import { connect } from "dva";
import { Layout ,  Badge , Icon , Button  , Avatar} from 'antd';
import { routerRedux , Link} from 'dva/router';
const { Header } = Layout;
import "./Nav.less";
import classnames from "classnames";



class Nav extends React.Component {
    constructor({ core }) {
        super()
        this.state={
          idx : true
        }
    }
    componentDidMount(){
      let self = this;
     $(window).mousewheel(function(event,direction){
      //下-1
        if(direction==-1&&$(this).scrollTop()>=100){
            self.setState({
              idx : false
            })
        }else if(direction==1){
            self.setState({
              idx : true
            })
        }
      });
    }
    render() {
        return (
              <Header id="header" className={classnames({"showHeader" : this.state.idx , "hideHeader" : !this.state.idx})}  style={{ background: '#fff', padding: 0 }}>
              <div className="logo">

              </div>
              <div className="nav">
                  <p>
                    <Link to="/core/content/">系统首页</Link>
                  </p>
                  <p>
                    <Link to="/core/content/StaffManagement">员工管理</Link>
                  </p>
                  <p>
                    <Link to="/core/content/AddEmploy">人事管理</Link>
                  </p>
                  <p>
                   <Link to="/core/content/thingsManagement">事物管理</Link>
                  </p>
                  <p>
                  <Link to="/core/content/LearningToShare">学习分享</Link>
                  </p>
                  <p>
                  <Link to="/core/content/SystemSettings">系统设置</Link>
                  </p>
                  <p>
                    <Badge count={this.props.core.protagonist.emailsum} overflowCount={99}>
                    <span  className="head-example"><Link to="/core/content/Email"><Icon type="mail" /></Link></span>
                    </Badge>
                  </p>
                  <p>
                    <Avatar style={{ backgroundColor: '#3498db' }} icon="user" />
                    <span className="myname"><Link to="/core/content/UserCore">{this.props.core.protagonist.name}</Link></span>
                     <Button type="danger" onClick={()=>{this.props.dispatch({'type':'core/outLgoin'}),this.props.dispatch(routerRedux.push("/"))}}>退出</Button>
                  </p>
              </div>
        </Header>
        )
    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(Nav)