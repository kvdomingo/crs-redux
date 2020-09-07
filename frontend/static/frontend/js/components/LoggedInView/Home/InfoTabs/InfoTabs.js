import React, {Component, lazy} from "react";
import {
    MDBTabPane as TabPane,
    MDBTabContent as TabContent,
    MDBNav as Nav,
    MDBNavItem as NavItem,
    MDBNavLink as NavLink,
    MDBContainer as Container,
} from "mdbreact";

const AnnouncementTab = lazy(() => import("./AnnouncementTab")),
      DelinquenciesTab = lazy(() => import("./DelinquenciesTab"));


export default class InfoTabs extends Component {
    state = {
        activeItem: "1",
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({ activeItem: tab });
        }
    }

    render() {
        return (
            <Container fluid>
                <Nav className="nav-tabs mt-5">
                    <NavItem>
                        <NavLink
                            to="#"
                            active={this.state.activeItem === "1"}
                            onClick={this.toggle("1")}
                            role="tab"
                        >
                            Announcements
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="#"
                            active={this.state.activeItem === "2"}
                            onClick={this.toggle("2")}
                            role="tab"
                        >
                            Delinquencies & Deficiencies
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeItem={this.state.activeItem}>
                    <TabPane tabId="1" role="tabpanel">
                        <AnnouncementTab />
                    </TabPane>
                    <TabPane tabId="2" role="tabpanel">
                        <DelinquenciesTab />
                    </TabPane>
                </TabContent>
            </Container>
        );
    }
}