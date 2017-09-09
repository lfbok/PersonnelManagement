import React from "react";
import { connect } from "dva";
import Login from "./components/login.js";
import "./less/home.less"
import { Form } from 'antd';
const WrappedDynamicRule = Form.create()(Login);
class Home extends React.Component {
    constructor({ home , form}) {
        super()
    }

    render() {
        return <div className="main">
                <div className="login">
                    <WrappedDynamicRule />
                </div>
            </div>

    }
}


export default connect(
    ({ home }) => {
        return {
            home
        }
    }
)(Home)