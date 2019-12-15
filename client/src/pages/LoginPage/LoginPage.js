import React, { Component } from 'react'
import { api } from '../../helpers/Api'

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state={
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

	//Nếu muốn xử lý login thì xử lý thằng này 
	handleLogIn = (e) => {
		e.preventDefault();
		const user = {
				email: this.state.email,
				password: this.state.password
		};
		// Ở đây post login với http://localhost:4000/api/login
		// Viết bên server nha 
		api.post('/login', user)
    .then(res => {
			console.log('Result',res);
        // Save Token to Local Storage And Send state for modal
        // const {token} = res.data;
        // localStorage.setItem('jwtToken', token);
        // setAuthToken(token);
        // const decoded = jwt_decode(token);
        // dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
			console.log('Error')
    });
	}

	render() {
		const {errors, password, account} = this.state;
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
							<div className="LoginInput">Tên đăng nhập*</div>
							<input id={`${errors && errors.account && 'ErrorForm'}`} type="text" placeholder="Điền tài khoản..." name="account" className="account" onChange={this.handleTextChange} value={account}/>
						</div>
						<div className="inputform">
							<div className="LoginInput">Mật khẩu*</div>
							<input id={`${errors && errors.password && 'ErrorForm'}`} type="password" placeholder="Điền mật khẩu..." name="password" className="password" onChange={this.handleTextChange} value={password}/>
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
				<div className="RegisterRedirect">
					<button className="Register" onClick={this.handleRes}>Register</button>
				</div>
			</div>
		)
	}
}

export default LoginPage;