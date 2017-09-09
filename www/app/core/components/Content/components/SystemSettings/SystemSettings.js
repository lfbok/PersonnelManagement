import React from "react";
import { connect } from "dva";


class SystemSettings extends React.Component {
    constructor({ core }) {
        super()

    }

     render(){
   return <div>
         <h1>这里是系统设置</h1>
          </div>
        }

}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(SystemSettings)