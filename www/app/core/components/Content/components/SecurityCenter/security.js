import React from "react";
import { connect } from "dva";


class security extends React.Component {
    constructor({ core }) {
        super()

    }

     render(){
   return <div>
         <h1>这里是安全中心</h1>
          </div>
        }

}


export default connect(
    ({ core }) => {
        return {
            core
        }
    }
)(security)