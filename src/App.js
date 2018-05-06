import React, { Component } from 'react';
import './App.css';
import TodoInput from "./TodoInput.js"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'test',
      todoList:[
        {id:1,title:''}
      ]
    }
  }
  render() {
    let todos = this.state.todoList.map((value,index)=>{//Array Api (value,index)
      return <li>{value.title}</li>
    })
    return (
      <div className="App">
        <h1>
          我的代办
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}/>
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
}

export default App;
