import React, {Component} from "react";
import Helmet from "react-helmet";
import {
    MDBContainer as Container,
    MDBIcon as Icon,
    MDBTypography as Type,
    MDBTable as Table,
    MDBTableHead as TableHead,
} from "mdbreact";
import ClassList from "./ClassList";
import axiosInstance from "../axios/axiosDefault";


export default class RegularClassesView extends Component {
    state = {
        acadYears: [],
        classList: [],
        semester: "",
    }

    componentDidMount() {
        axiosInstance.get("/academic-years")
            .then(res => this.setState({
                acadYears: res.data,
                semester: res.data[0].id,
            }))
            .catch(console.log);
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        let { semester, start_year } = this.state.acadYears.find(obj => obj.id === parseInt(this.state.semester));
        if (semester && start_year) {
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
            axiosInstance.get(`/regular-classes/${start_year}/${semester}`)
                .then(res => this.setState({ classList: res.data }))
                .catch(console.log);
        }
    }

    render() {
        let { acadYears } = this.state;
        return (
            <div>
                <Container className="text-center p-0 p-md-5">
                    <Helmet>
                        <title>Regular Classes | UP Computerized Registration System</title>
                    </Helmet>

                    <Type tag="h1" variant="h2-responsive">Regular Classes</Type>
                    <form className="mt-4" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <select
                                name="semester"
                                value={this.state.semester}
                                className="browser-default custom-select"
                                onChange={this.handleChange}
                            >
                                {acadYears.map(({ id, semester, start_year }, i) => (
                                    <option
                                        value={id}
                                        key={i}
                                        selected={i === 0}
                                    >
                                        {semester}, A.Y. {start_year}-{start_year + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                                placeholder="Search"
                            />
                        </div>
                    </form>
                </Container>

                <Container fluid>
                    <Table bordered responsive>
                        <TableHead>
                            <tr className="text-center">
                                <th>Class Code</th>
                                <th>Class</th>
                                <th>Credits</th>
                                <th>Schedule / Instructor(s) / Remarks</th>
                                <th>Enlisting Unit / Block / Block Remarks</th>
                                <th>Available Slots / Total Slots</th>
                                <th>Demand</th>
                                <th>Restrictions</th>
                            </tr>
                        </TableHead>
                        <ClassList classList={this.state.classList} />
                    </Table>
                </Container>
            </div>
        );
    }
}
