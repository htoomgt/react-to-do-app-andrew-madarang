import React from "react";
import PropTypes from "prop-types";

const ToDoFilter = (props) => {
    return (
        <div>
            <button
                onClick={() => props.updateFilter("all")}
                className={props.filter === "all" ? "active" : ""}
            >
                All
            </button>

            <button
                onClick={() => props.updateFilter("active")}
                className={props.filter === "active" ? "active" : ""}
            >
                Active
            </button>

            <button
                onClick={() => props.updateFilter("completed")}
                className={props.filter === "completed" ? "active" : ""}
            >
                Completed
            </button>
        </div>
    );
};

ToDoFilter.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default ToDoFilter;
