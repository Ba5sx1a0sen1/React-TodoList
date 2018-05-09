import React, { Component } from 'react';
import "normalize.css"
import './App.css';
import './reset.css'
import TodoInput from "./TodoInput"
import TodoItem from "./ToduItem"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'',
      todoList:[]
    }
  }
  addTodo=(event)=>{
    this.state.todoList.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false,
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  changeTitle=(e)=>{
    this.setState({
      newTodo:e.target.value,
      todoList: this.state.todoList
    })
  }
  toggle=(e,todo)=>{
    todo.status= todo.status === 'completed'?'':'completed'
    this.setState(this.state)
    console.log(this.state)
  }

  delete=(e,todo)=>{
    todo.deleted = true
    this.setState(this.state)
    console.log(this.state)    
  }

  render() {
    let todos = this.state.todoList.map((value,index)=>{//Array Api (value,index)
      return (
      <li key={index}>
        <TodoItem todo={value} 
        onDelete={this.delete}
        onToggle={this.toggle}/>
      </li>
      )
    })
    return (
      <div className="App">
        <h1>
          我的代办
        </h1>
        <div className="inputWrapper">
          <TodoInput 
          onSubmit={this.addTodo}
          onChange={this.changeTitle}
          content={this.state.newTodo}/>
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
}

let id = 0
function idMaker(){
  id+=1
  return id
}
export default App;
