import React, { Component } from 'react';
import AV, { User } from "leancloud-storage"
import "normalize.css"
import './App.css';
import './reset.css'
import TodoInput from "./TodoInput"
import TodoItem from "./ToduItem"
import UserDialog from "./UserDialog"
import {getCurrentUser,signOut} from './leancloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
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
  onSignUp=(user)=>{
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut=()=>{
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  render() {
    let todos = this.state.todoList
      .filter((item)=>(item.deleted!==true))
      .map((value,index)=>{//Array Api (value,index)
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
          {this.state.user.username||'我'}的待办
          {this.state.user.id?<button onClick={this.signOut}>登出</button>:null}
        </h1>
        <div className="inputWrapper">
          <TodoInput 
          onSubmit={this.addTodo}
          onChange={this.changeTitle}
          content={this.state.newTodo}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id?null:<UserDialog onSignUp={this.onSignUp}/>}
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
