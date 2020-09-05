import React, {Component} from "react";
import {
    MDBNavbar as Navbar,
    MDBNavbarBrand as NavbarBrand,
    MDBNavbarNav as NavbarNav,
    MDBNavItem as NavItem,
    MDBNavLink as NavLink,
    MDBNavbarToggler as NavbarToggler,
    MDBCollapse as Collapse,
} from "mdbreact";
import { Link, withRouter } from "react-router-dom";


const navLinks = [
    { label: "Home", link: "/" },
    { label: "Regular Classes", link: "/" },
    { label: "Course Catalog", link: "/" },
    { label: "Curriculum Checklist", link: "/" },
    { label: "Regular Calendar", link: "/" },
    { label: "FAQs", link: "/" },
    { label: "The CRS Team", link: "/" },
]

class Navigation extends Component {
    state = {
        isOpen: false,
    }

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    render() {
        return (
            <Navbar dark color="red darken-4" expand="xl">
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
                        {navLinks.map(({ label, link }, i) => (
                            <NavItem key={i}>
                                <NavLink to={link}>{label}</NavLink>
                            </NavItem>
                        ))}
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Navigation);