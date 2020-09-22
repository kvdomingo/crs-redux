import { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentUser } from "./redux/userData/userDataActions";
import {
    dispatchCurrentSemester,
    fetchAnnouncements,
    fetchCrsStatus,
} from "./redux/crsData/crsDataActions";
import axiosInstance from "./axios/axiosDefault";

const mapStateToProps = state => ({
    userData: state.userData,
    crsData: state.crsData,
});

const mapDispatchToProps = dispatch => ({
    dispatchCurrentSemester: data => dispatch(dispatchCurrentSemester(data)),
    fetchAnnouncements: () => dispatch(fetchAnnouncements()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchCrsStatus: () => dispatch(fetchCrsStatus()),
});

class GlobalStateListener extends Component {
    componentDidMount() {
        this.props.fetchAnnouncements();
        this.props.fetchCurrentUser();
        this.props.fetchCrsStatus();

        axiosInstance
            .get("/academic-years")
            .then(res => this.props.dispatchCurrentSemester(res.data[0]))
            .catch(console.log);
    }

    render = () => null;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GlobalStateListener);
