import React from "react";
import {
    MDBTableBody as TableBody,
} from "mdbreact";
import HtmlParser from "react-html-parser";


export default function ClassList({ classList }) {
    if (classList.length === 0) return null;
    else {
        let data = [];
        classList.forEach(cls => {
            let processed = [];
            processed.push(cls.id);
            if (parseInt(cls.number) === cls.number) {
                processed.push(`${cls.code} ${parseInt(cls.number)}`);
            } else {
                processed.push(`${cls.code} ${cls.number}`);
            }
            processed.push(cls.credits);
            let instructors = cls.instructor.map(inst => `${inst.last_name}, ${inst.first_name}`)
            processed.push(`${cls.schedule}<br />${instructors.join("; ")}`);
            processed.push(cls.enlisting_unit.code)
            processed.push(`${cls.total_slots - cls.enlisted_slots} / ${cls.total_slots}`);
            processed.push(0);
            processed.push("");
            data.push(processed);
        });
        return (
            <TableBody>
                {data.map((dat, i) => (
                    <tr className="text-center" key={i}>
                        {dat.map((d, j) => (
                            <td key={j}>{HtmlParser(d)}</td>
                        ))}
                    </tr>
                ))}
            </TableBody>
        );
    }
}