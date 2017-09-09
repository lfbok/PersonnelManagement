import React from "react";
import {Router , Route , IndexRoute} from "dva/router";
import Home from "../home/Home.js";
import Core from "../core/Core.js";
import Content from "../core/components/Content/Content.js";
import PersonalHomePage from "../core/components/Content/components/PersonalHomePage/PersonalHomePage.js";
import UserCore from "../core/components/Content/components/UserCore/UserCore.js";
import StaffManagement from "../core/components/Content/components/StaffManagement/StaffManagement.js";
import AddEmploy from "../core/components/Content/components/addEmploy/addemploy.js";
import StaffDetails from "../core/components/Content/components/Staffdetails/Staffdetails.js";
import Email from "../core/components/Content/components/Email/Email.js";
import LearningToShare from "../core/components/Content/components/LearningToShare/LearningToShare.js";
import personnelManagement from "../core/components/Content/components/personnelManagement/personnelManagement.js";
import security from "../core/components/Content/components/SecurityCenter/security.js";
import SystemSettings from "../core/components/Content/components/SystemSettings/SystemSettings.js";
import thingsManagement from "../core/components/Content/components/ThingsManagement/thingsManagement.js";
import MailList from "../core/components/Content/components/MailList/MailList.js";
export default ({history})=>{
    return (
        <Router history={history}>
            <Route path="/" component={Home}/>
            <Route path="core" component={Core}>
                <Route path="content" component={Content}>
                    <IndexRoute component={PersonalHomePage}/>
                    <Route path="HomePage" component={PersonalHomePage}/>
                    <Route path="UserCore" component={UserCore}/>
                    <Route path="StaffManagement" component={StaffManagement}/>
                    <Route path="AddEmploy" component={AddEmploy}/>
                    <Route path="StaffDetails/:id" component={StaffDetails}/>
                    <Route path="Email" component={Email}/>
                    <Route path="LearningToShare" component={LearningToShare}/>
                    <Route path="personnelManagement" component={personnelManagement}/>
                    <Route path="security" component={security}/>
                    <Route path="SystemSettings" component={SystemSettings}/>
                    <Route path="thingsManagement" component={thingsManagement}/>
                    <Route path="MailList" component={MailList}/>
             </Route>
            </Route>
        </Router>
        )
}
