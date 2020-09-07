import React, {Component, Fragment} from "react";
import {
    MDBContainer as Container,
    MDBListGroup as ListGroup,
    MDBListGroupItem as ListGroupItem,
    MDBBadge as Badge,
} from "mdbreact";


export default class DelinquenciesTab extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        fetch("/api/delinquencies")
            .then(res => res.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return (
            <Container fluid className="p-4">
                {(this.state.data.length > 0)
                    ? <ListGroup>
                        {this.state.data.map(({ details }, i) => (
                            <ListGroupItem key={i}>{details}</ListGroupItem>
                        ))}
                    </ListGroup>
                    : <p className="text-center">Congratulations, you have no delinquencies to settle!</p>
                }

                <div className="note note-info mt-4">
                    <p>
                        In general, you would not be able to complete the registration procedures if you have academic delinquencies and/or accountabilities. You can still pre-enlist slots during the pre-enlistment period, but whether or not you can enlist subjects during the registration period depends on the following:
                    </p>
                    <ul>
                        <li>
                            <b>Academic Eligibility</b>: if <Badge color="red" className="kill-shadow">Ineligible</Badge>, you cannot enlist slots, cannot be validated, and cannot be assessed. Reasons in this category include MRR, AWOL and Entrance Credentials, among others.
                        </li>
                        <li>
                            <b>Accountability Status</b>: if <Badge color="red" className="kill-shadow">With Accountabilities</Badge>, you can still enlist slots and be validated, but you cannot be assessed. Reasons in this category include Underassessment, Unreturned Books and Unsettled Dues, among others.
                        </li>
                    </ul>
                    <p>
                        Once tagged, the status would be retained EVERY SEMESTER unless you comply with the requirements of the Office/Department/College that tagged you.
                    </p>
                    <p><b>How to settle academic delinquencies/accountabilities</b></p>
                    <p>Proceed to the office(s) indicated in the table and inquire about how to remove the delinquency and/or accountability. The procedure varies depending on the reason so try to be there early or contact the office concerned if there are requirements you need to bring. You can log in anytime using your CRS account to see the current status of your delinquencies/accountabilities.</p>
                    <p><b>How to differentiate between statuses</b></p>
                    <p>An academic delinquency and/or accountability either (1) prevents you from enrolling, (2) temporarily allows you to enroll this semester, or (3) has already been cleared/lifted.</p>
                    <ol>
                        <li>
                            <span className="text-danger">INELIGIBLE/WITH ACCOUNTABILITIES</span> - uncleared, unexcused academic delinquencies and/or accountabilities. Having at least one will prevent you from enrolling until settled.
                        </li>
                        <li>
                            <span className="text-muted">TEMPORARILY ELIGIBLE/TEMPORARILY CLEARED/TEMPORARILY EXCUSED</span> - this is a temporary status set every semester by the office where you incurred an academic delinquency and/or accountability. This status allows you to enroll for the current semester ONLY but will automatically prevent you from enrolling for the next term. Some offices will allow you to write an appeal to have this status but take note that NOT ALL reasons can be excused. Some of them really have to be settled before registration (e.g., admission slip for AWOL or LOA students).
                        </li>
                        <li>
                            <span className="text-success">ELIGIBLE/CLEARED/LIFTED</span> - means you have settled all your academic delinquencies and/or accountabilities (or you don't have any) and you are eligible to enroll.
                        </li>
                    </ol>
                </div>
            </Container>
        );
    }
}