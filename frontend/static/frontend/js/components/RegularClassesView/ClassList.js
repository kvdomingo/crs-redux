import React from "react";
import {
    MDBTableBody as TableBody,
} from "mdbreact";


export default function ClassList({ classList }) {
    if (classList.length === 0) return null;
    else {
        let data = [];
        classList.forEach(cls => {
            let processed = [];
            processed.push(String(cls.id).padStart(5, "0"));

            let class_name = cls.code;
            if (parseInt(cls.number) === cls.number) {
                class_name += ` ${parseInt(cls.number)}`;
            } else {
                class_name += ` ${cls.number}`;
            }

            class_name += ` ${cls.section}`;
            processed.push(class_name);

            processed.push(cls.credits.toFixed(1));

            let instructors = cls.instructor.map(inst => `${inst.last_name}, ${inst.first_name}`);
            processed.push(`${cls.schedule}<br />${instructors.join("; ")}`);

            processed.push(cls.enlisting_unit.code);
            processed.push(`<b>${cls.total_slots - cls.enlisted_slots}</b> / ${cls.total_slots}`);
            processed.push(cls.demand.toString());
            processed.push("");

            data.push(processed);
        });
        return (
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
                    <td>{""}</td>
                </tr>
            ))}
            </TableBody>
        );
    }
}
