import React, { Fragment } from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBTypography as Type,
} from "mdbreact";
import dateFormat from "dateformat";
import HtmlParser from "react-html-parser";
import Loading from "../Loading";
import { connect } from "react-redux";


const mapStateToProps = state => {
    let {
        announcements,
        announcementsLoading,
        announcementsError
    } = state.crsData;
    announcements.forEach(obj => obj.created = dateFormat(obj.created, "dd mmmm yyyy, h:MM TT Z"));
    return { announcements, announcementsLoading, announcementsError };
};

function Announcements({ announcements, announcementsLoading }) {
    return (
        <Card className="kill-card-shadow">
            <CardHeader>Announcements</CardHeader>
            <CardBody>
                {(announcementsLoading)
                    ? <Loading />
                    : (announcements.length > 0)
                        ? announcements.map((ann, i) => (
                            <Fragment key={i}>
                                <div>
                                    <Type tag="h2" variant="h4-responsive text-uppercase" colorText="red">
                                        {ann.title}
                                    </Type>
                                    <small className="text-muted">
                                        {ann.created}
                                    </small>
                                    <p className="mt-4">{HtmlParser(ann.content)}</p>
                                </div>
                                <hr className="my-4" />
                            </Fragment>
                        ))
                        : <p className="text-center">No announcements to show</p>
                }
            </CardBody>
        </Card>
    );
}

export default connect(mapStateToProps)(Announcements);
