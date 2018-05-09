import React from "react"
export default class TodoItem extends React.Component{
    render(){
        return (
            <div>
                <input type="checkbox" 
                onChange={this.toggle}
                checked={this.props.todo.status === 'completed'}/>
                {this.props.todo.title}
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