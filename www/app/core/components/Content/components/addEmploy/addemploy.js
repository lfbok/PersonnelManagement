import React from "react";
import { connect } from "dva";
import "./addemploy.less";
import { Form } from 'antd';
const FormItem = Form.Item;
import  WrappedRegistrationForm from "./WrappedRegistrationForm.js"
class AddEmploy extends React.Component {
    constructor({ core }) {
        super()

    }

    render() {
        const WrappedTimeRelatedForm = Form.create()(WrappedRegistrationForm);
        return <div>
            <p className="addtext"><span>新增员工</span></p>
            <WrappedTimeRelatedForm />
        </div>

    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(AddEmploy)