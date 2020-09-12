import React, {Component, Fragment} from "react";
import {
    MDBContainer as Container,
    MDBTypography as Type,
} from "mdbreact";
import dateFormat from "dateformat";
import HtmlParser from "react-html-parser";
import Loading from "../../../Loading";


export default class AnnouncementTab extends Component {
    state = {
        data: [],
        isLoaded: false,
    }

    componentDidMount() {
        fetch("/api/announcements", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
            }
        })
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
            <Container fluid className="p-4">
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
}