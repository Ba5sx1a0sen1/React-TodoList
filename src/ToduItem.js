import React from "react"
import "./TodoItem.css"
export default class TodoItem extends React.Component{
    render(){
        return (
            <div className="TodoItem">
                <input type="checkbox" 
                onChange={this.toggle}
                checked={this.props.todo.status === 'completed'}/>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete}>删除</button>
            </div>
        )
    }
    toggle=(e)=>{
        this.props.onToggle(e,this.props.todo)
    }
    delete=(e)=>{
        this.props.onDelete(e,this.props.todo)
    }
}