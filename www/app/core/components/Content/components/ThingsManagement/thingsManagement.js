import React from "react";
import { connect } from "dva";

class thingsManagement extends React.Component {
      constructor({addmonthactivity , emptymonthactivity,core}){
        super()

      }

  render() {

    return (
      <div>
          <h1>这里是事物管理</h1>
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
)(thingsManagement)