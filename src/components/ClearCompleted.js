import React from "react";
import PropTypes from "prop-types";

const ClearCompleted = (props) => {
    return (
        <div>
            <button onClick={(event) => props.clearCompleted(event)}>
                Clear Completed
            </button>
        </div>
    );
};

ClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired
};

export default ClearCompleted;
