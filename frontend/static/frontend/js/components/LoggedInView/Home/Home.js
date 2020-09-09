import React, {Component} from "react";
import Helmet from "react-helmet";
import RegStatus from "./RegStatus";
import InfoTabs from "./InfoTabs/InfoTabs";


export default class Home extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Home | UP Computerized Registration System</title>
                </Helmet>

                <RegStatus userData={this.props.userData} />
                <InfoTabs />
            </div>
        );
    }
}