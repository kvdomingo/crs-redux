import React from "react";
import PropTypes from "prop-types";


function TextField(props) {
    let data = { ...props };
    if (!data.label) data.label = data.name.split("_").join(" ");

    return (
        <div className="form-group">
            <label
                htmlFor={data.name}
                className={`text-capitalize ${(data.required) ? "font-weight-bold" : null}`}
            >
                {data.label}
            </label>
            {(data.type === "textarea")
                ? <textarea
                    className="form-control"
                    name={data.name}
                    value={data.value}
                    onChange={data.handleChange}
                    required={data.required}
                    rows={3}
                />
                : <input
                    type={data.type}
                    className="form-control"
                    name={data.name}
                    value={data.value}
                    onChange={data.handleChange}
                    required={data.required}
                />
            }
        </div>
    );
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
    required: false,
    type: "text",
}

export default TextField;