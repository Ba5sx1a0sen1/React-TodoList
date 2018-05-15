import React from "react"
import "./UserDialog.css"
import { signUp, signIn } from "./leancloud"
export default class UserDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: "signUp",//signin
            selectedTab: 'signInOrSignUp',//forgotpassword
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    deepClone(state) {
        return JSON.parse(JSON.stringify(state))
    }
    switch = (e) => {
        this.setState({
            selected: e.target.value
        })
    }
    signUp = (e) => {
        e.preventDefault()// 防止刷新
        let { username, password, email } = this.state.formData
        let success = (user) => {
            this.props.onSignUp(user)
        }
        let error = (error) => {
            switch (error.code) {
                case 202:
                    alert('用户名已被占用')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(email, username, password, success, error)
    }
    signIn = (e) => {
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignIn(user)
        }
        let error = (error) => {
            switch (error.code) {
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('用户名不存在')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }
    changeUserName = (e) => {
        let stateCopy = this.deepClone(this.state)
        stateCopy.formData.username = e.target.value
        this.setState(stateCopy)
    }
    changePassword = (e) => {
        let stateCopy = this.deepClone(this.state)
        stateCopy.formData.password = e.target.value
        this.setState(stateCopy)
    }
    changeEmail = (e) => {
        let stateCopy = this.deepClone(this.state)
        stateCopy.formData.email = e.target.value
        this.setState(stateCopy)
    }
    showForgotPassword = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPassword = () => {

    }
    render() {
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp}> {/* 注册*/}
                <div className="row">
                    <label htmlFor="">邮箱</label>
                    <input type="text" name="" id=""
                        value={this.state.formData.email}
                        onChange={this.changeEmail}
                    />
                </div>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"
                        value={this.state.formData.username}
                        onChange={this.changeUserName}
                    />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password"
                        value={this.state.formData.password}
                        onChange={this.changePassword}
                    />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn" onSubmit={this.signIn}> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text"
                        value={this.state.formData.username}
                        onChange={this.changeUserName}
                    />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password"
                        value={this.state.formData.password}
                        onChange={this.changePassword}
                    />
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                    <a href="#"
                        onClick={this.showForgotPassword}
                    >忘记密码了？</a>
                </div>
            </form>
        )
        let signInOrSignUp = (
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio" value="signUp"
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)}
                        /> 注册</label>
                    <label>
                        <input type="radio" value="signIn"
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch.bind(this)}
                        /> 登录</label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ? signUpForm : null}
                    {this.state.selected === 'signIn' ? signInForm : null}
                </div>
            </div>
        )
        let forgotPassword = (
            <div className="forgotPassword">
                <h3>
                    重置密码
              </h3>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}> {/* 登录*/}
                    <div className="row">
                        <label>邮箱</label>
                        <input type="text" value={this.state.formData.email}
                            onChange={this.changeEmail} />
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                    </div>
                </form>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
                </div>
            </div>
        )
    }
}