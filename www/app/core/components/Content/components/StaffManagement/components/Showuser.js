import React from "react";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { Icon, Button,Modal, Table, Pagination } from 'antd';
import Leading from "./leading.js";

import "./Showuser.less";
const columns = [
    { title: 'ID', width: 80, dataIndex: 'key', key: 'key', fixed: 'left' },
    { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: '性别', width: 100, dataIndex: 'sex', key: 'sex', fixed: 'left' },
    { title: '部门', dataIndex: 'branch', key: 'branch' },
    { title: '岗位', dataIndex: 'station', key: 'station' },
    { title: '工作手机号', dataIndex: 'phonenumber', key: 'phonenumber' },
    { title: '员工性质', dataIndex: 'employeenature', key: 'employeenature' },
    { title: '入职时间', dataIndex: 'hiredate', key: 'hiredate' },
    { title: '试用期', dataIndex: 'qualifyingperiod', key: 'qualifyingperiod' },
    { title: '证件类型', dataIndex: 'typeid', key: 'typeid' },
    { title: '证件号', dataIndex: 'idnumber', key: 'idnumber' },

];
var data = [];


class Showuser extends React.Component {
    constructor({ core }) {
        super()
        this.state = {
             visible: false
           };
    }
    componentDidMount() {
        this.props.dispatch({ 'type': 'core/getAlluser', 'page': this.props.core.page||1, 'pagesize': 10 ,'sub':this.props.core.search})
    }
    render() {
        data = []
        this.props.core.staff.forEach((item, index) => {
            let soloObj = {
                'key': index + 1,
                'name': item.name,
                'sex': item.sex,
                'branch': item.branch,
                'station': item.station,
                'phonenumber': item.phonenumber,
                'employeenature': item.employeenature,
                'hiredate': item.hiredate,
                'qualifyingperiod': item.qualifyingperiod,
                'typeid': item.typeid,
                'idnumber': item.idnumber,
                '_id':item._id
            }
            data.push(soloObj)
        })
        var onShowSizeChange = (current, pageSize) => {
            this.props.dispatch({ 'type': 'core/getAlluser', 'page': 1, 'pagesize': pageSize })
        }
        var onChangesize = (page, pagesize) => {
            this.props.dispatch({ 'type': 'core/getAlluser', 'page': page, 'pagesize': pagesize ,'sub':this.props.core.search})
        }
        var hideModal = (visible) => {
           this.setState({
                 visible
           });
        }
        return <div className = "Showuser" >
            <p className = "recordstrip" > < Icon type = "filter" / > 共 < span className = "filterjiu" > { this.props.core.staffAll } < /span>条记录</p >
            <Table onRowClick={(record)=>{this.props.dispatch({'type':'core/particular','idnumber':record._id}),this.props.dispatch(routerRedux.push("/core/content/StaffDetails/"+record._id))}} columns = { columns } dataSource = { data } pagination = { false }/> <div className = "footpage" >
            <div className = "addka" >
                 <span className="addButtons"><Button onClick={()=>{this.props.dispatch(routerRedux.push("/core/content/addEmploy"))}} type="primary" icon="plus" >增加员工</Button></span>
                 <span className="addButtons"><Button type="primary" icon="cloud-upload-o" onClick={()=>{hideModal(true)}}>导入员工<Leading visible={this.state.visible} hideModal={hideModal}></Leading></Button></span>
                 <span className="addButtons"><Button type="primary" icon="cloud-download-o" >导出员工</Button></span>
            < /div>
            <div className = "pages" >
            <Pagination showSizeChanger
            onChange = { onChangesize }
            onShowSizeChange = { onShowSizeChange }
            total = { this.props.core.staffAll }
            defaultCurrent={this.props.core.page||1}/>
            </div>
        </div>
     </div>
    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(Showuser)