import React from "react";
import { connect } from "dva";
import { Button, Modal, Form, Input, Radio , DatePicker } from 'antd';
import "./CollectionsPage.less"
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem  label="事项内容：">
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '内容不能为空!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="事项类型：" className="Activity collection-create-form_last-form-item">
            {getFieldDecorator('type', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="warning">警告</Radio>
                <Radio value="normal">正常</Radio>
                <Radio value="error">严重</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="事项时间：">
          {getFieldDecorator('date')( <DatePicker/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);




class CollectionsPage extends React.Component {
      constructor({addmonthactivity , emptymonthactivity,core}){
        super()

      }
componentDidMount(){
  this.props.dispatch({"type":"core/getmonthactivity"})
}
  render() {
  var handleCancel=()=>{
    this.props.emptymonthactivity();
  }
  var handleCreate=()=>{
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let date = `${values.date._d.getFullYear()}-${values.date._d.getMonth()+1}-${values.date._d.getDate()}`;
      let substance = values.content;
      let mold  = values.type
      this.props.dispatch({"type":"core/addmonthactivity" ,date,mold,substance})
      form.resetFields();
      this.props.emptymonthactivity();
    });
  }
  var saveFormRef=(form)=>{
    this.form = form;
  }
    return (
      <div>
        <CollectionCreateForm
          ref={saveFormRef}
          visible={this.props.addmonthactivity}
          onCancel={handleCancel}
          onCreate={handleCreate}
        />
      </div>
    );
  }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(CollectionsPage)