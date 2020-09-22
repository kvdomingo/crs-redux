import React from "react";
import Helmet from "react-helmet";
import RegStatus from "./RegStatus";
import InfoTabs from "./InfoTabs/InfoTabs";
import { connect } from "react-redux";


const mapStateToProps = state => ({
    userData: state.userData.userData || [],
});

function Home({ userData }) {
    let userStatus = userData.user_status || [];

    return (
        <div>
            <Helmet>
                <title>Home | UP Computerized Registration System</title>
            </Helmet>

            { !(userStatus.user_status === "Staff") && <RegStatus /> }
            <InfoTabs />
        </div>
    );
}

export default connect(mapStateToProps)(Home);
