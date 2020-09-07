import React, {Component} from "react";
import RegStatus from "./RegStatus";
import InfoTabs from "./InfoTabs/InfoTabs";


export default class Home extends Component {
    render() {
        return (
            <div>
                <RegStatus userData={this.props.userData} />
                <InfoTabs />
            </div>
        );
    }
}