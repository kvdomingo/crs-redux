import React, {Component, Fragment} from "react";
import {
    MDBNavbar as Navbar,
    MDBNavbarBrand as NavbarBrand,
    MDBNavbarNav as NavbarNav,
    MDBNavItem as NavItem,
    MDBNavbarToggler as NavbarToggler,
    MDBBtn as Button,
    MDBCollapse as Collapse,
    MDBTypography as Type,
} from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { dispatchUserData } from "./redux/userData/userDataActions";
import axiosInstance from "./axios/axiosDefault";


const mapStateToProps = state => ({
    userData: state.userData.userData,
});

const mapDispatchToProps = dispatch => ({
    dispatchUserData: data => dispatch(dispatchUserData(data)),
});

class Navigation extends Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        axiosInstance.get("/auth/user/current")
            .then(res => {
                let { data } = res;
                this.props.dispatchUserData(data);
            })
            .catch(err => {
                localStorage.removeItem("token");
                axiosInstance.defaults.headers.Authorization = "JWT ";
            })
    }

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    handleLogout = () => {
        localStorage.removeItem("token");
        this.props.logoutChangeView();
    }

    render() {
        let { userData } = this.props,
            userStatus = (userData.user_status) ? userData.user_status : [];
        return (
            <Navbar dark color="red darken-4" expand="lg" className="kill-shadow">
                <NavbarBrand>
                    <Link to="/">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/3/3d/University_of_The_Philippines_seal.svg"
                            height={80}
                            alt="UP logo"
                        />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <NavbarNav left>
                        <NavItem>
                            <Type tag="h1" variant="h5-responsive text-white d-flex h-100 align-items-center">
                                UP Computerized Registration System
                            </Type>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        {(localStorage.getItem("token")
                            && <Fragment>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        {userData.username}
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        {userStatus.user_status}
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        {`SN ${userStatus.student_number}`}
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        {userStatus.course}
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <Button
                                        className="red darken-3 kill-shadow"
                                        onClick={this.handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </NavItem>
                            </Fragment>
                        )}
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
