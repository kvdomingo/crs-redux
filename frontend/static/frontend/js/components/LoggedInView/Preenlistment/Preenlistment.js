import React, {Component} from "react";
import {
    MDBContainer as Container,
    MDBIcon as Icon,
    MDBTable as Table,
    MDBTableBody as TableBody,
    MDBTableHead as TableHead,
} from "mdbreact";
import Helmet from "react-helmet";


export default class Preenlistment extends Component {
    state = {
        search: "",
        classesNow: [],
        semesterNow: [],
    }

    async componentDidMount() {
        fetch("/api/academic-years")
            .then(async res => await res.json())
            .then(async semesterNow => await this.setState({ semesterNow }));

        let userData = await this.props.userData,
            userStatus = userData.user_status,
            classesNow = userStatus.classes_taken.filter(obj => {
                return ((obj.semester.semester === this.state.semesterNow.semester)
                    && (obj.semester.start_year === this.state.semesterNow.start_year));
            });
        this.setState({ classesNow });
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        let classHeaders = [
            "Class Code",
            "Class",
            "Credits",
            "Schedule / Instructor(s) / Remarks",
            "Enlisting Unit / Block / Block Remarks",
            "Available Slots / Total Slots",
            "Demand",
            "Restrictions",
        ];

        return (
            <div>
                <Helmet>
                    <title>Preenlistment | UP Computerized Registration System</title>
                </Helmet>

                <Container className="text-center p-0 p-md-5">
                    <form className="mt-4" onSubmit={this.handleSubmit}>
                        <div className="input-group md-form form-sm form-1 pl-0">
                            <div className="input-group-prepend">
                        <span className="input-group-text red darken-4">
                            <Icon className="text-white" icon="search" />
                        </span>
                            </div>
                            <input
                                className="form-control my-0 py-1"
                                type="text"
                                aria-label="Search"
                                placeholder="Search for classes"
                            />
                        </div>
                    </form>
                </Container>

                <Container fluid>
                    <Table bordered responsive>
                        <TableHead>
                            <tr className="text-center">
                                {classHeaders.map((head, i) => (
                                    <th key={i}>{head}</th>
                                ))}
                            </tr>
                        </TableHead>
                        <TableBody>
                            {(this.state.classesNow.length === 0)
                                ? <tr>
                                    <td colSpan="8" className="text-center">No classes to display</td>
                                </tr>
                                : null
                            }
                        </TableBody>
                    </Table>
                </Container>
            </div>
        );
    }
}