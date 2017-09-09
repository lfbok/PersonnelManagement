import React from "react";
import { connect } from "dva";


class personnelManagement extends React.Component {
    constructor({ core }) {
        super()

    }

     render(){

   return <div>
         <h1>这里是人事管理</h1>
          </div>
        }

}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(personnelManagement)