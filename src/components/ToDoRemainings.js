import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToDoRemainings extends Component {
    render() {
        return (
            <div>
                {this.props.remaining} items left
            </div>
        )
    };
}

ToDoRemainings.propTypes = {
    remaining: PropTypes.number.isRequired
}

export default ToDoRemainings;
