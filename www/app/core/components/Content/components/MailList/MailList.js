import React from "react";
import { connect } from "dva";

class MailList extends React.Component {
    constructor({ core }) {
        super()

    }

     render(){

   return <div>
          <h1>这里是通讯录</h1>
          </div>
        }

}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(MailList)