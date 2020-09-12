import React, {Component} from "react";
import Helmet from "react-helmet";
import RegStatus from "./RegStatus";
import InfoTabs from "./InfoTabs/InfoTabs";


export default class Home extends Component {
    render() {
        let { userData } = this.props,
            userStatus = userData.user_status || [];

        return (
            <div>
                <Helmet>
                    <title>Home | UP Computerized Registration System</title>
                </Helmet>

                {(userStatus.user_status === "Staff") || <RegStatus userData={userData} />}
                <InfoTabs userData={userData} />
            </div>
        );
    }
}