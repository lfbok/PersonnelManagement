import React from "react";
import { connect } from "dva";
import { Modal, Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;
var users = []
class Leading extends React.Component {
    constructor({ hideModal, visible }) {
        super()
        this.state={
            fileName:null,
            ic:null,
            error:false
        }
    }


    render() {
        var error = ()=>{
            if(this.state.error) return
              Modal.error({
                title: '导入失败',
                content: '文件格式不正确',
              });
                this.setState({error:true})
                setTimeout(()=>{this.setState({error:false})},200)
            }
          var success = ()=> {
              Modal.success({
                title: '导入成功',
                content: `导入${users.length}位员工成功`,
              });
            }
        var wb; //读取完成的数据
        var rABS = false; //是否将文件读取为二进制字符串
            if(!this.props.visible){users = []}
        var importf=(obj)=> { //导入
            var f = obj.file.originFileObj;
            this.setState({fileName:f.name,ic:'paper-clip'})
            var cs = f.name.split('.');
            if(cs[cs.length-1]=="xls"||cs[cs.length-1]=="xlsx"||cs[cs.length-1]=="XLS"||cs[cs.length-1]=="XLSX"){
            var reader = new FileReader();
            reader.onload = (e)=> {
                var data = e.target.result;
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(data)), { //手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }
                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                users = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        function fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l *     w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
                }
            }else{
                error()
            }
       }

        const props = {
                  name: 'file',
                  multiple: true,
                  showUploadList: false,
                  action:'/importUser',
                  onChange:(e)=>{importf(e)}
                };
        return ( <div>
            <Modal title = "导入员工"
            visible = { this.props.visible } onOk = {
                () => { this.props.hideModal(false),this.props.dispatch({'type':'core/importUser',users}),this.state.fileName&&success() } } onCancel = {
                () => { this.props.hideModal(false),this.setState({fileName:null,ic:null})}} okText = "确认"
            cancelText = "取消" >
            <div style={{ marginTop: 16, height: 180 }}>
                  <Dragger
                    {...props}
                    >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                     <p className="ant-upload-hint"><Icon type={this.state.ic} />{this.state.fileName}</p>
                    <p className="ant-upload-text">请点击或拖拽上传,<small>注意：只支持xls和xlsx格式</small></p>
                  </Dragger>
                </div>
             </Modal>
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
)(Leading)