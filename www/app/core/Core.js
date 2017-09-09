import React from "react";
import { connect } from "dva";
import {IndexLink} from "dva/router"
import { Layout , Button} from 'antd';
const { Header , Footer} = Layout;
import "./less/core.less";
import User from "./components/User/User.js";
import Nav from "./components/Nav/Nav.js";
import Content from "./components/Content/Content.js";
class Core extends React.Component {
    constructor({ core }) {
        super()
    }
     componentWillMount(){
      this.props.dispatch({'type':'core/online'})
    }

    render() {
      if(!this.props.core.protagonist.login==1){
          return <div>请登录后再试<IndexLink to="/">
                <Button type="primary">返回首页</Button>
              </IndexLink>
            </div>
      }
        return  <div>
            <Layout>
            <User></User>
              <Layout style={{ marginLeft: 200 }}>
                <Nav></Nav>
                  {this.props.children}
                <Footer style={{ textAlign: 'center' }}>
                  同步时代科技©2016 Created by LIN FENG
                </Footer>
              </Layout>
              </Layout>
        </div>

    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(Core)