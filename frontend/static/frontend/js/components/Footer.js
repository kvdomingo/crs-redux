import React, {Component} from "react";
import {
    MDBFooter as Footer,
    MDBContainer as Container,
    MDBTypography as Type,
} from "mdbreact";
import { Link } from "react-router-dom";


export default class PageFooter extends Component {
    render() {
        return (
            <Footer className="footer red darken-4 pt-4 mt-4 font-small">
                <Container fluid className="text-center text-md-left">
                    <Type tag="h5" variant="h5-responsive" className="title text-uppercase">
                        Quick links
                    </Type>
                    <ul>
                        <li className="list-unstyled">
                            <Link to="/regular-classes">Regular Classes</Link>
                        </li>
                        <li className="list-unstyled">
                            <Link to="/course-catalog">Course Catalog</Link>
                        </li>
                        <li className="list-unstyled">
                            <Link to="/curriculum-checklist">Curriculum Checklist</Link>
                        </li>
                        <li className="list-unstyled">
                            <Link to="/regular-calendar">Regular Calendar</Link>
                        </li>
                        <li className="list-unstyled">
                            <Link to="/faq">CRS FAQ</Link>
                        </li>
                        <li className="list-unstyled">
                            <Link to="/crs-team">The CRS Team</Link>
                        </li>
                        <li className="list-unstyled">
                            <Link to="/privacy-policy">Privacy Notice</Link>
                        </li>
                    </ul>
                </Container>
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                        &copy; {new Date().getFullYear()}
                    </Container>
                </div>
            </Footer>
        );
    }
}