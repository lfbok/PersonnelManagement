import React from "react";
import { connect } from "dva";
import { Layout , Card, Col, Row , Tag , Calendar , Button} from 'antd';
const { Content } = Layout;
import "./PersonalHomePage.less";
import CollectionsPage from "../CollectionsPage/CollectionsPage.js"
const gridStyle = {
  width: '16.6%',
  textAlign: 'center',
};
class PersonalHomePage extends React.Component {
    constructor({ core }) {
        super()
        this.state = {
          addmonthactivity:false
        }

    }
    componentDidMount(){
      this.props.dispatch({'type':'core/initTodo'})
    }

    render() {
      var dateCellRender = (value)=>{
         var getListData = (value)=>{
      var listData;
    for(var i = 0; i < this.props.core.monthactivity.length;i++){
        if(value.year()==this.props.core.monthactivity[i].date.split('-')[0] && value.date()==this.props.core.monthactivity[i].date.split('-')[2] && value.month()==parseInt(this.props.core.monthactivity[i].date.split('-')[1])-1){
          var str = this.props.core.monthactivity[i].listData[0]
            if(typeof str == "string"){
              listData=[JSON.parse(this.props.core.monthactivity[i].listData[0])]
            }else{
              listData= this.props.core.monthactivity[i].listData
            }

        }
      }

      return listData || [];
    }
      const listData = getListData(value);
      return (
        <ul className="events">
          {
            listData.map(item => (
              <li key={item.content}>
                <span className={`event-${item.type}`}>●</span>
                {item.content}
              </li>
            ))
          }
        </ul>
      );
    }

    var getMonthData = (value)=>{
      if (value.month() === 8) {
        return 1394;
      }
    }

    var monthCellRender=(value)=>{
      const num = getMonthData(value);
      return num ? <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div> : null;
    }
    var addmonthactivity=()=>{
      this.setState({
        addmonthactivity:true
      })
    }
    var emptymonthactivity=()=>{
      this.setState({
        addmonthactivity:false
      })
    }
        return (
                <div>
                  <Row gutter={32}>
                  {this.props.core.todolist.map((item,index)=>{
                    return <Col span={4} key={index} className="todo">
                      <Card title={item.entry} bordered={false}>近{item.day}天有<span className="sumpeople">{item.numberofpeople}</span>人</Card>
                    </Col>
                  })}
                  </Row>
                  <Card title="本月统计" noHovering>
                    {this.props.core.modification.map((item , index)=>{
                        return <Card.Grid key={index} style={gridStyle}>{item.entry}<span className="sumpeople">{item.numberofpeople}</span>人</Card.Grid>
                    })}
                    </Card>
                    <Row  className="bottomcomponent">
                      <Col span={15}>
                            <div className="zdycalendar">工作日历 <Button type="primary" onClick={addmonthactivity}>增加活动</Button></div>
                            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                      </Col>
                      <Col span={9}>col-12</Col>
                    </Row>
                 <CollectionsPage
                 addmonthactivity={this.state.addmonthactivity}
                  emptymonthactivity={emptymonthactivity}
                 />
                </div>
            )



    }
}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(PersonalHomePage)