import React from "react";
import { connect } from "dva";

class LearningToShare extends React.Component {
      constructor({addmonthactivity , emptymonthactivity,core}){
        super()

      }

  render() {

    return (
      <div>
          <h1>这里是学习分享</h1>
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
)(LearningToShare)