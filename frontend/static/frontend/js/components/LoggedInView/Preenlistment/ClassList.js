import React from "react";
import PropTypes from "prop-types";
import {
    MDBTableBody as TableBody,
    MDBBtn as Button,
} from "mdbreact";


function ClassList({ classList, updateClassesNow }) {
    const handleSubmit = id => e => {
        e.preventDefault();
        fetch("/api/class/add-desired", {
            method: "POST",
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then(async res => await res.json())
            .then(res => updateClassesNow(res.classes_taken));
    }

    if (classList.length === 0) return (
        <TableBody>
            <tr className="text-center">
                <td colSpan="8">No classes to show</td>
            </tr>
        </TableBody>
    );
    else return (
        <TableBody>
            {classList.map((cls, i) => (
                <tr className="text-center" key={i}>
                    <td>{String(cls.id).padStart(5, "0")}</td>
                    <td>
                        {cls.code} {parseInt(cls.number) === cls.number ? parseInt(cls.number) : cls.number} {cls.section}
                    </td>
                    <td>{cls.credits.toFixed(1)}</td>
                    <td>
                        {cls.schedule}<br />
                        {cls.instructor.map(inst => `${inst.last_name}, ${inst.first_name}`).join("; ")}
                    </td>
                    <td>{cls.enlisting_unit.code}</td>
                    <td>
                        <b>{cls.total_slots - cls.enlisted_slots}</b> / {cls.total_slots}
                    </td>
                    <td>{cls.demand.toString()}</td>
                    <td>
                        <Button
                            size="sm"
                            color="success"
                            className="kill-shadow"
                            onClick={handleSubmit(cls.id)}
                        >
                            Add to desired classes
                        </Button>
                    </td>
                </tr>
            ))}
        </TableBody>
    );
}

ClassList.propTypes = {
    classList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
        number: PropTypes.number,
        credits: PropTypes.number,
        instructor: PropTypes.shape({
            first_name: PropTypes.string,
            last_name: PropTypes.string,
        }),
        enlisting_unit: PropTypes.shape({
            code: PropTypes.string,
        }),
        total_slots: PropTypes.number,
        enlisted_slots: PropTypes.number,
        demand: PropTypes.number,
    })),
    updateClassesNow: PropTypes.func.isRequired,
}

ClassList.defaultProps = {
    classList: [],
}

export default ClassList;
