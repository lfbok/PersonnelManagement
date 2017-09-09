import React from "react";
import { connect } from "dva";

class Email extends React.Component {
    constructor({ core }) {
        super()

    }

     render(){

   return <div>
              <h1>这里是邮箱系统</h1>
          </div>
        }

}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(Email)