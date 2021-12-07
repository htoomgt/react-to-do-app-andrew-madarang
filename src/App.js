import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import uuid from 'react-uuid';


class App extends Component {
  render(){
    return(
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
                {this.todosFiltered().map((todo, index) => 
                  
                

                <div className="todo-item" key={todo.id}>
                    <div className="todo-item-left">
                        <input type="checkbox" onChange={() => this.checkToDo(todo.id)} checked={todo.completed}/>

                        {!todo.editing &&
                        <div className={
                          `todo-item-label
                          ${todo.completed ? `completed` : ``} `
                        } 
                        onDoubleClick={() => this.editTodo(todo, index)}
                        
                        >{todo.title}</div>

                      }

                      { todo.editing &&

                        <input 
                          type="text" 
                          className="todo-item-edit" 
                          defaultValue={todo.title} 
                          autoFocus 
                          onBlur={(event) => this.doneEdit(todo, index, event)}
                          onKeyUp={(event) => {
                            if(event.key === 'Enter'){
                              this.doneEdit(todo, index, event);
                            }
                            else if(event.key === 'Escape'){
                              this.cancelEdit(todo, index, event);
                            }
                          }
                            
                          }
                        />

                      }
                        
                    </div>

                    <div className="remove-item" onClick={ () => this.deleteTodo(todo.id) }  > &times; </div>
                </div>
                )}

                <div className="extra-container">
                    <div>
                        <label>
                            <input type="checkbox" checked={!this.anyRemaining()} onChange={this.checkAll}/> Check All
                        </label>
                    </div>
                    <div> {this.remaining()} items left </div>
                </div>

                <div className="extra-container">
                    <div>
                        <button  
                          onClick={() => this.updateFilter('all')} 
                          className={this.state.filter === 'all' ? 'active' : ''}
                          >All</button>

                        <button  
                          onClick={() => this.updateFilter('active')} 
                          className={this.state.filter === 'active' ? 'active' : ''}
                        >Active</button>

                        <button                           
                         onClick={() => this.updateFilter('completed')} 
                         className={this.state.filter === 'completed' ? 'active' : ''}
                        >Completed</button>
                    </div>

                    <div>
                        <button
                          onClick={(event) => this.clearCompleted(event)}
                        >Clear Completed</button>
                    </div>
                </div>
            </div>
            {/* To do container end */}
        </div>
    );
  }

  todoInput = React.createRef();

  state = {
    filter : 'all',
    beforeEditCache : '',
    todos : [
      {
        'id': uuid(),
        'title' : 'Finish React Screencast',
        'completed' : false,
        'editing' : false
      },
      {
        'id': uuid(),
        'title' : 'Take over world',
        'completed' : false,
        'editing' : false
      },
    ]
  }

  addToDo = (event) => {
    event.preventDefault();

    if(event.key === "Enter"){
      const todoInput = this.todoInput.current.value;   
      
      if(todoInput.trim().length  === 0){
        return;
      }
      
      this.setState((preState, props) => {
        let vartodos = preState.todos;
        
        vartodos.push({
          "id" : uuid(),
          "title" : todoInput,
          "completed" : false,
          "editing" : false
        });

        return { todos : vartodos };

      });

      this.todoInput.current.value = '';    
      
      
      
    }

  }


  deleteTodo = (id) => {    

    this.setState((preState, props) => {
      let vartodos = preState.todos;
      
      vartodos = vartodos.filter(todo => todo.id !== id);
      
      

      return { todos : vartodos };
    });
  }

  checkToDo = (id) => {

    this.setState((preState, props) => {
      let varTodos = preState.todos;

      varTodos = varTodos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
        return todo;
      });

      return { todos : varTodos };


    });
  }

  checkAll = (event) => {

    event.persist();

    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todos.forEach((todo) => todo.completed = event.target.checked);

      return { todos };
    });
    



  }

  updateFilter = filter => {
    this.setState({ filter });
  }

  todosFiltered = () => {
    

    if (this.state.filter === 'all') {
      return this.state.todos;
    } else if (this.state.filter === 'active') {
      return this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.filter === 'completed') {
      return this.state.todos.filter(todo => todo.completed);
    }

    return this.state.todos;

     

      
    

  }

  remaining = () => {
    return this.state.todos.filter(todo => !todo.completed).length;
  }

  anyRemaining = () => {
    return this.remaining() !== 0;
  }

  editTodo = (paramTodo, index) => {
    this.setState((prevState, props) => {
      let varTodos = prevState.todos;
      

      varTodos.map(todo => {
        if(todo === paramTodo){
          todo.editing = true;
        }
        
        return todo;
      })

      return { todos : varTodos };


    });

  }

  doneEdit = (paramTodo, index, event) => {
    event.persist();

    this.setState((prevState, props) => {
      let varTodos = prevState.todos;
      

      varTodos.map(todo => {
        if(todo === paramTodo){
          todo.editing = false;
          prevState.beforeEditCache = todo.title;

          if(event.target.value.trim().length === 0){
            todo.title = prevState.beforeEditCache;
          }
          else{
            todo.title = event.target.value;
            
          }
          prevState.beforeEditCache = todo.title;

          
        }
        
        return todo;
      })

      return { todos : varTodos };


    });

  }

  cancelEdit = (paramTodo, index) => {
    this.setState((prevState, props) => {
      let varTodos = prevState.todos;
      

      varTodos.map(todo => {
        if(todo === paramTodo){          
          prevState.beforeEditCache = todo.title;
          todo.editing = false;
          todo.title = prevState.beforeEditCache;
        }
        
        return todo;
      })

      return { todos : varTodos };

      
    });

  }

  clearCompleted = (event) => {
    event.persist();;

    this.setState((prevState, props) => {
      let varTodos = prevState.todos;
      

      varTodos = varTodos.filter((todo) => !todo.completed);
      
      

      return { todos : varTodos };
    });

  }



  
}



export default App;
