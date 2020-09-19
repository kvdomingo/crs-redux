import React, {Component} from "react";
import {
    MDBContainer as Container,
    MDBIcon as Icon,
    MDBTable as Table,
    MDBTableBody as TableBody,
    MDBTableHead as TableHead,
} from "mdbreact";
import Helmet from "react-helmet";
import WeekSchedule from "./WeekSchedule";
import AllClassList from "./ClassList";
import MyClassList from "../../RegularClassesView/ClassList";


export default class Preenlistment extends Component {
    state = {
        search: "",
        classList: [],
        classesNow: [],
        allClasses: [],
        semesterNow: [],
    }

    async componentDidMount() {
        let { currentSemester } = await this.props;
        this.setState({ semesterNow: currentSemester });

        let { userData } = await this.props,
            userStatus = userData.user_status,
            classesNow = userStatus.classes_taken.filter(obj => (
                (obj.semester.semester === this.state.semesterNow.semester)
                    && (obj.semester.start_year === this.state.semesterNow.start_year)
            ));
        this.setState({ classesNow });

        fetch("/api/auth/user/current")
            .then(async res => await res.json())
            .then(res => {
                let userStatus = res.user_status,
                    allClasses = userStatus.classes_taken;
                this.setState({ allClasses });
            });
    }

    updateClassesNow = classesNow => {
        this.setState({ classesNow });
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        let { semester, start_year } = await this.props.currentSemester;
        switch (semester) {
            case "First Semester":
                semester = 1;
                break;
            case "Second Semester":
                semester = 2;
                break;
            case "Midyear":
                semester = 3;
                break;
            default:
                semester = "";
        }
        fetch(`/api/regular-classes/${start_year}/${semester}`)
            .then(res => res.json())
            .then(classList => this.setState({ classList }));
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
                                name="search"
                                aria-label="Search"
                                placeholder="Search for classes"
                                onChange={this.handleChange}
                                value={this.state.search}
                            />
                        </div>
                    </form>
                </Container>

                <Container fluid>
                    <Table bordered responsive>
                        <TableHead>
                            <tr className="text-center blue-grey lighten-4">
                                <th colSpan={8} className="font-weight-bold">
                                    Available classes
                                </th>
                            </tr>
                            <tr className="text-center">
                                <th>Class Code</th>
                                <th>Class</th>
                                <th>Credits</th>
                                <th>Schedule / Instructor(s) / Remarks</th>
                                <th>Enlisting Unit / Block / Block Remarks</th>
                                <th>Available Slots / Total Slots</th>
                                <th>Demand</th>
                                <th>Action</th>
                            </tr>
                        </TableHead>
                        <AllClassList
                            classList={this.state.classList}
                            updateClassesNow={this.updateClassesNow}
                        />
                    </Table>
                </Container>

                <Container fluid>
                    <WeekSchedule />
                </Container>

                <Container fluid>
                    <Table bordered responsive>
                        <TableHead>
                            <tr className="text-center blue-grey lighten-4">
                                <th colSpan={8} className="font-weight-bold">
                                    My classes
                                </th>
                            </tr>
                            <tr className="text-center">
                                {classHeaders.map((head, i) => (
                                    <th key={i}>{head}</th>
                                ))}
                            </tr>
                        </TableHead>
                        <MyClassList classList={this.state.classesNow} />
                    </Table>
                </Container>
            </div>
        );
    }
}