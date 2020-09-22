import React, { Fragment } from "react";
import {
    MDBContainer as Container,
    MDBTypography as Type,
} from "mdbreact";
import dateFormat from "dateformat";
import HtmlParser from "react-html-parser";
import Loading from "../../../Loading";
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

function AnnouncementTab({ announcements, announcementsLoading }) {
    return (
        <Container fluid className="p-4">
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
                                <div className="mt-4">{HtmlParser(ann.content)}</div>
                            </div>
                            <hr className="my-4" />
                        </Fragment>
                    ))
                    : <p className="text-center">No announcements to show</p>
            }
        </Container>
    );
}

export default connect(mapStateToProps)(AnnouncementTab);
