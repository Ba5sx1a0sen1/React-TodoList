import React from "react"
import "./UserDialog.css"
import { signUp, signIn, sendPasswordResetEmail } from "./leancloud"
import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"
import ForgotPasswordForm from "./ForgotPasswordForm"

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
        if (username.length <= 3) {
            alert('用户名必须大于三个字符')
            return false
        }
        if (password.length < 6) {
            alert('密码必须不小于6个字符')
            return false
        }
        let success = (user) => {
            this.props.onSignUp(user)
        }
        let error = (error) => {
            switch (error.code) {
                case 125:
                    alert('邮箱格式不正确')
                    break
                case 202:
                    alert('用户名已被占用')
                    break
                case 203:
                    alert('该邮箱地址已被占用')
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
    changeFormData = (key, e) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    showForgotPassword = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPassword = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
    returnToSignIn = (e) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    render() {
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
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.state.formData}
                            onSubmit={this.signUp}
                            onChange={this.changeFormData} />
                        : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm
                            formData={this.state.formData}
                            onChange={this.changeFormData.bind(this)}
                            onSubmit={this.signIn.bind(this)}
                            onForgotPassword={this.showForgotPassword.bind(this)}
                        />
                        : null}
                </div>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ?
                        signInOrSignUp :
                        <ForgotPasswordForm
                            formData={this.state.formData}
                            onSubmit={this.resetPassword.bind(this)}
                            onChange={this.changeFormData.bind(this)}
                            onSignIn={this.returnToSignIn.bind(this)}
                        />
                    }
                </div>
            </div>
        )
    }
}