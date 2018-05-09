import React from "react"
import "./TodoInput.css"
export default class TodoInput extends React.Component{
    render(){
        return (
            <input type="text"
                   value={this.props.content}
                   onKeyPress={this.submit}
                   onChange={this.changeTitle}
                   className="TodoInput"
                   />
        )
    }
    submit=(e)=>{
        if(e.key==='Enter'){
            this.props.onSubmit(e)
        }
    }
    changeTitle=(e)=>{
        this.props.onChange(e)
    }
}