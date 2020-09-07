import React, {Component, Fragment} from "react";
import {
    MDBCard as Card,
    MDBCardHeader as CardHeader,
    MDBCardBody as CardBody,
    MDBTypography as Type,
} from "mdbreact";
import dateFormat from "dateformat";
import HtmlParser from "react-html-parser";
import Loading from "../Loading";


export default class Announcements extends Component {
    state = {
        data: [],
        isLoaded: false,
    }

    componentDidMount() {
        fetch("/api/announcements")
            .then(res => res.json())
            .then(res => {
                let data = res;
                data.forEach(dat => {
                    dat.created = dateFormat(dat.created, "dd mmmm yyyy, h:MM TT Z")
                });
                this.setState({ data, isLoaded: true });
            });
    }

    render() {
        return (
            <Card className="kill-card-shadow">
                <CardHeader>Announcements</CardHeader>
                <CardBody>
                    {(!this.state.isLoaded)
                        ? <Loading />
                        : (this.state.data.length > 0)
                            ? this.state.data.map((ann, i) => (
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
}