import React from "react";
import { connect } from "dva"
import { Row, Col ,Icon ,Input } from 'antd';
import "./InformationPartSingle.less"
 class InformationPart extends React.Component{
        constructor({item}){
            super()
            this.state = {
                idx : true,
                json :item
            }
        }

        ChangeEdit(e,index){
            this.setState({
                json:{
                    ...this.state.json,
                    content:this.state.json.content.map((item)=>{
                            if(item.k==index){
                                return {
                                    ...item,
                                    v:e.target.value
                                }
                            }else{
                                return item
                            }
                    })
                }
            })
        }

        editUser(){
            if(this.props.identity=='admin'){
                 this.props.dispatch({'type':'core/editadmin',data:this.state.json,id:this.props.core.protagonist._id})
            }else{

            this.props.dispatch({'type':'core/edituser',data:this.state.json,id:this.props.core.Staffdetails._id})
            }
            this.setState({
                idx:true
            })
        }

        render(){
            return <div>
                    <div className="InformationPartSingleHeader">
                         <Row>
                              <Col span={8}>
                                <span>{this.state.json.title}</span>
                              </Col>
                              <Col span={8} offset={8}>
                                    {
                                        this.state.idx?
                                        <p className="editthis" onClick={()=>{this.setState({idx:false})}}><Icon type="edit" /><span className="edittext">编辑</span></p>
                                        :
                                    <p className="editthis"><Icon onClick={()=>{this.editUser()}} className='jiujiuok' type="check" /><Icon className='jiujiuout' type="close" onClick={()=>{this.setState({idx:true})}}/></p>

                                    }
                              </Col>
                            </Row>
                    </div>
                    <div className="InformationPartSingleContent">
                    {
                        this.state.json.content.map((item,index)=>{
                            return <div key={index} className="Singlesmall">
                               <div className="SinglesmallTitle">
                                    <span>{item.k}：</span>
                               </div>
                               <div className="SinglesmallValue">
                                        <span>{this.state.idx?item.v:<Input value={item.v} onChange={(e)=>{this.ChangeEdit(e,item.k)}} />}</span>
                               </div>
                            </div>
                        })
                    }

                    </div>
            </div>
        }
}


export default connect(
        ({core})=>{
            return {
                core
            }
        }
    )(InformationPart)