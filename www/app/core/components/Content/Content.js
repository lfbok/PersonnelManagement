import React from "react";
import { connect } from "dva";
import { Layout } from 'antd';
import "./Content.less"
const { Content } = Layout;
class Contents extends React.Component {
    constructor({ core }) {
        super()

    }

    render() {
        return (
            <Content style={{ margin: '80px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center' , minHeight:700}}>
                        {this.props.children}
                </div>
            </Content>
          )
    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(Contents)