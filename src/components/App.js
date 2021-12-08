import logo from "../logo.svg";
import "../App.css";
import React, { Component } from "react";
import uuid from "react-uuid";
import { CSSTransitionGroup } from "react-transition-group";
import ToDoRemainings from "./ToDoRemainings";
import ToDoItem from "./ToDoItem";
import ToDoCheckAll from "./ToDoCheckAll";
import ToDoFilter from "./ToDoFilter";
import ClearCompleted from "./ClearCompleted";

class App extends Component {
   /*  constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      } */

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className="Todo-container">
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="What needs to be done!"
                        onKeyUp={this.addToDo}
                        ref={this.todoInput}
                    />
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {this.todosFiltered().map((todo, index) => (
                            <ToDoItem 
                                key={todo.id}
                                todo={todo}
                                index={index}                                
                                checkToDo={this.checkToDo}
                                editTodo={this.editTodo}
                                doneEdit={this.doneEdit}
                                cancelEdit={this.cancelEdit}
                                deleteTodo={this.deleteTodo}
                            />
                        ))}
                    </CSSTransitionGroup>

                    <div className="extra-container">
                        <ToDoCheckAll anyRemaining={this.anyRemaining} checkAll={this.checkAll} />
                        
                        <ToDoRemainings remaining={this.remaining()}/>
                    </div>

                    <div className="extra-container">
                        <ToDoFilter 
                            updateFilter={this.updateFilter}
                            filter={this.state.filter}
                        />

                        <CSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {this.todoCompletedCount() > 0 && (
                                <ClearCompleted 
                                    clearCompleted={this.clearCompleted}
                                />
                            )}
                        </CSSTransitionGroup>
                    </div>
                </div>
                {/* To do container end */}
            </div>
        );
    }

    todoInput = React.createRef();

    state = {
        newTodo: "",
        filter: "all",
        beforeEditCache: "",
        todos: [
            {
                id: uuid(),
                title: "Finish React Screencast",
                completed: false,
                editing: false,
            },
            {
                id: uuid(),
                title: "Take over world",
                completed: false,
                editing: false,
            },
        ],
    };

    addToDo = (event) => {
        event.preventDefault();

        if (event.key === "Enter") {
            const todoInput = this.todoInput.current.value;

            if (todoInput.trim().length === 0) {
                return;
            }

            this.setState((preState, props) => {
                let vartodos = preState.todos;

                vartodos.push({
                    id: uuid(),
                    title: todoInput,
                    completed: false,
                    editing: false,
                });

                return { todos: vartodos };
            });

            this.todoInput.current.value = "";
        }
    };

    deleteTodo = (id) => {
        this.setState((preState, props) => {
            let vartodos = preState.todos;

            vartodos = vartodos.filter((todo) => todo.id !== id);

            return { todos: vartodos };
        });
    };

    checkToDo = (id) => {
        this.setState((preState, props) => {
            let varTodos = preState.todos;

            varTodos = varTodos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });

            return { todos: varTodos };
        });
    };

    checkAll = (event) => {
        event.persist();

        this.setState((prevState, props) => {
            let todos = prevState.todos;

            todos.forEach((todo) => (todo.completed = event.target.checked));

            return { todos };
        });
    };

    updateFilter = (filter) => {
        this.setState({ filter });
    };

    todosFiltered = () => {
        if (this.state.filter === "all") {
            return this.state.todos;
        } else if (this.state.filter === "active") {
            return this.state.todos.filter((todo) => !todo.completed);
        } else if (this.state.filter === "completed") {
            return this.state.todos.filter((todo) => todo.completed);
        }

        return this.state.todos;
    };

    remaining = () => {
        return this.state.todos.filter((todo) => !todo.completed).length;
    };

    anyRemaining = () => {
        return this.remaining() !== 0;
    };

    editTodo = (paramTodo, index) => {
        this.setState((prevState, props) => {
            let varTodos = prevState.todos;

            varTodos.map((todo) => {
                if (todo === paramTodo) {
                    todo.editing = true;
                }

                return todo;
            });

            return { todos: varTodos };
        });
    };

    doneEdit = (paramTodo, index, event) => {
        event.persist();

        this.setState((prevState, props) => {
            let varTodos = prevState.todos;

            varTodos.map((todo) => {
                if (todo === paramTodo) {
                    todo.editing = false;
                    prevState.beforeEditCache = todo.title;

                    if (event.target.value.trim().length === 0) {
                        todo.title = prevState.beforeEditCache;
                    } else {
                        todo.title = event.target.value;
                    }
                    prevState.beforeEditCache = todo.title;
                }

                return todo;
            });

            return { todos: varTodos };
        });
    };

    cancelEdit = (paramTodo, index) => {
        this.setState((prevState, props) => {
            let varTodos = prevState.todos;

            varTodos.map((todo) => {
                if (todo === paramTodo) {
                    prevState.beforeEditCache = todo.title;
                    todo.editing = false;
                    todo.title = prevState.beforeEditCache;
                }

                return todo;
            });

            return { todos: varTodos };
        });
    };

    todoCompletedCount = () => {
        return this.state.todos.filter((todo) => todo.completed).length;
    };

    clearCompleted = (event) => {
        event.persist();

        this.setState((prevState, props) => {
            let varTodos = prevState.todos;

            varTodos = varTodos.filter((todo) => !todo.completed);

            return { todos: varTodos };
        });
    };
}

export default App;
