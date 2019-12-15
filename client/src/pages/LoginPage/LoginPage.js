import React, { Component } from 'react'

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state={
				username:'',
				account:'',
				password:'',
				errors:'',
		};
	}

	// Handle Input Text
	handleTextChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		const {errors, password, account, username} = this.state;
		return (
			<div className="LoginPage">
				{/* Content In NAVBAR before LOGIN */}
				{/* <div className={`LoginForm ${isLogin && 'disable'}`}> */}
				<div className="LoginForm">
					<div className="title">Đã Có Tài Khoản</div>
					{/* Content Here */}
					<div className="box-content">
					{ errors && ((errors.account && <div className="Alert">Your e-mail/password is invalid!</div> )|| 
						(errors.password && <div className="Alert">Your e-mail/password is invalid!</div>))}
						{/* Nhập tài khoản */}
						<div className="inputform">
							<div for="account">Tên đăng nhập*</div>
							<input id={`${errors && errors.account && 'ErrorForm'}`} type="text" placeholder="Điền tài khoản..." name="account" className="account" onChange={this.handleTextChange} value={account}/>
						</div>
						<div className="inputform">
							<div for="password">Mật khẩu*</div>
							<input id={`${errors && errors.password && 'ErrorForm'}`} type="password" placeholder="Điền mật khẩu..." name="password" onChange={this.handleTextChange} value={password}/>
						</div>
						{/* <div className="otherform">
							<input type="checkbox" name="remember" value="remember" className="remembercheckbox"/>
							<label for="remembercheckbox">Ghi nhớ mật khẩu</label>
						</div> */}
					</div>
					<div className="HandleInput">
						<div onClick={this.HandleLogtoForgot}>Quên mật khẩu? </div>
						<button className="Login" onClick={this.handleLogin}>Đăng Nhập</button>
					</div>
				</div>
				<div classname="RegisterRedirect">
					<button className="Register" onClick={this.handleRes}>Register</button>
				</div>
			</div>
		)
	}
}

export default LoginPage;