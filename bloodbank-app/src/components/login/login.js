import React, {Component} from "react";
import "./login.css";
import * as firebase from 'firebase';
import Button from 'material-ui/Button';
import fb from "../../firebase.js";
import TextField from 'material-ui/TextField';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loginUser, loginFail, loginSuccess} from "../../actions/auth";
import {Link} from 'react-router-dom';

class Login extends Component {
	constructor(){
		super();
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	state = {
		email:'',
		password:''
	}
	handleEmail(event){
		this.setState({
			email:event.target.value
		});
	}

	handlePassword(event){
		this.setState({
			password:event.target.value
		});
	}

handleLogin(){
		 	fb.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() =>{
                	this.props.loginSuccess();
                	this.props.history.push('/donor-list')
                })
                .catch((error)=>{
                    var errorMessage = error.message;
                    this.props.loginFail(errorMessage);
                    console.log(this.props.auth);
			});
	}

	componentWillMount(){
		fb.auth().onAuthStateChanged((user)=>{
		  if (user) {
		  	this.props.loginSuccess();
		//  this.props.history.push('/donor-list');
		  }
		});
	}

	goToSignup(){
		this.props.history.push("/signup");
	}

    	render(){
		return (
				<div>
					<div className="login_component">
						<div className="login_form_container">
							<h1>User Login</h1>
							<form className="login_form">
								<TextField
						          id="email"
						          value={this.state.email}
						          onChange={this.handleEmail}
						          label="Email"
						          margin="normal"
						          style={{width:250}}
						        />
						        <br/>
						        <TextField
						          id="password"
						          value={this.state.password}
						          onChange={this.handlePassword}
						          label="Password"
						          type="password"
						          margin="normal"
						          style={{width:250}}
						        />
						        <br/><br/>
						        <Button raised onClick={this.handleLogin} color="accent" style={{backgroundColor:"rgb(186,0,21)"}}>
							       LOGIN
							    </Button>
							    <br/><br/>
							    <div style={{color:"red"}}>
							    {(this.props.auth.loginError==='')? '' : '* '+this.props.auth.loginError }
							    </div>
							    <div>
								<button style={{backgroundColor:"white", border: "3px solid rgb(186,0,21)", padding: "8px", fontSize: "14px"}} onClick={this.goToSignup.bind(this)} > Create an account </button>
							    
							    </div>
					        </form>
						</div>
					</div>
				</div>
			);
	}
}

    function mapStateToProps(state){
	return {
		auth:state.auth
	}
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({
		loginUser:loginUser,
		loginFail:loginFail,
		loginSuccess:loginSuccess
	},dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Login);