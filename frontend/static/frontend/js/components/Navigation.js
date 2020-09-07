import React, {Component, Fragment} from "react";
import {
    MDBNavbar as Navbar,
    MDBNavbarBrand as NavbarBrand,
    MDBNavbarNav as NavbarNav,
    MDBNavItem as NavItem,
    MDBNavbarToggler as NavbarToggler,
    MDBBtn as Button,
    MDBCollapse as Collapse,
} from "mdbreact";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";


export default class Navigation extends Component {
    state = {
        isOpen: false,
    }

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    handleLogout = () => {
        localStorage.removeItem("token");
        this.props.logoutChangeView();
    }

    render() {
        return (
            <Navbar dark color="red darken-4" expand="md">
                <NavbarBrand>
                    <Link to="/">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/3/3d/University_of_The_Philippines_seal.svg"
                            height={100}
                            alt="UP logo"
                        />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <NavbarNav left>
                        <NavItem>
                            <div className="text-white d-flex h-100 align-items-center text-center mx-2">
                                {dateFormat(new Date(), "dddd, d mmmm yyyy")}
                                <br />
                                {dateFormat(new Date(), "h:MM tt")}
                            </div>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        {(localStorage.getItem("token")
                            ? <Fragment>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        {this.props.userData.username}
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        SN&nbsp;{this.props.userData.student_number}
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <div className="text-white d-flex h-100 align-items-center mx-2">
                                        {this.props.userData.course}
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
                            : null
                        )}
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}