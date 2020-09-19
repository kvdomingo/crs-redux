import React from "react";
import {
    MDBTableBody as TableBody,
    MDBBtn as Button,
} from "mdbreact";


export default function ClassList({ classList, updateClassesNow }) {
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