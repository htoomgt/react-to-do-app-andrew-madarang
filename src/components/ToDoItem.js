import React, { Component } from "react";
import PropTypes from "prop-types";

class ToDoItem extends Component {
    render() {
        return (
            <div>
                <div className="todo-item">
                    <div className="todo-item-left">
                        <input
                            type="checkbox"
                            onChange={() =>
                                this.props.checkToDo(this.props.todo.id)
                            }
                            checked={this.props.todo.completed}
                        />

                        {!this.props.todo.editing && (
                            <div
                                className={`todo-item-label
                          ${this.props.todo.completed ? `completed` : ``} `}
                                onDoubleClick={() =>
                                    this.props.editTodo(this.props.todo, this.props.index)
                                }
                            >
                                {this.props.todo.title}
                            </div>
                        )}

                        {this.props.todo.editing && (
                            <input
                                type="text"
                                className="todo-item-edit"
                                defaultValue={this.props.todo.title}
                                autoFocus
                                onBlur={(event) =>
                                    this.props.doneEdit(
                                        this.props.todo,
                                        this.props.index,
                                        event
                                    )
                                }
                                onKeyUp={(event) => {
                                    if (event.key === "Enter") {
                                            this.props.doneEdit(
                                            this.props.todo,
                                            this.props.index,
                                            event
                                        );
                                    } else if (event.key === "Escape") {
                                            this.props.cancelEdit(
                                            this.props.todo,
                                            this.props.index,
                                            event
                                        );
                                    }
                                }}
                            />
                        )}
                    </div>

                    <div
                        className="remove-item"
                        onClick={() => this.props.deleteTodo(this.props.todo.id)}
                    >
                        {" "}
                        &times;{" "}
                    </div>
                </div>
            </div>
        );
    }
}

ToDoItem.propTypes = {
    todo : PropTypes.object.isRequired,
    index : PropTypes.number.isRequired,
    checkTodo : PropTypes.func.isRequired,
    editTodo : PropTypes.func.isRequired,
    doneEdit: PropTypes.func.isRequired,
    cancel : PropTypes.func.isRequired,
    deleteTodo : PropTypes.func.isRequired
};

export default ToDoItem;
