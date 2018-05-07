import React from "react"
export default class TodoItem extends React.Component{
    render(){
        return (
            <div>
                <input type="checkbox" 
                onChange={this.toggle}
                checked={this.props.todo.status === 'completed'}/>
                {this.props.todo.title}
            </div>
        )
    }
    toggle=(e)=>{
        this.props.onToggle(e,this.props.todo)
    }
}