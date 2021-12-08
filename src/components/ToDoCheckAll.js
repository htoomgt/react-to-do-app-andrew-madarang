import React from 'react';
import PropTypes from 'prop-types';

const ToDoCheckAll = props => {
    return (
        <div>
            <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={!props.anyRemaining()}
                            onChange={props.checkAll}
                        />
                        Check All
                    </label>
                </div>
        </div>
    );
};

ToDoCheckAll.propTypes = {
    anyRemaining: PropTypes.func.isRequired,
    checkAll: PropTypes.func.isRequired
};

export default ToDoCheckAll;