import React, {Component} from "react";
import "./signup.css";
import * as firebase from 'firebase';
import Button from 'material-ui/Button';
import fb from "../../firebase.js";
import TextField from 'material-ui/TextField';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {signupUser, signupFail, signupSuccess} from "../../actions/auth";

class SignUp extends Component {
	constructor(){
		super();
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
	}
	state = {
		email:'',
		password:'',
		username:''
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

	handleUsername(event){
		this.setState({
			username:event.target.value
		});
	}	

	handleSignup(){
		 	fb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() =>{
                	this.props.history.push('/login')
                })
                .catch((error)=>{
                    var errorMessage = error.message;
                    this.props.signupFail(errorMessage);
                    console.log(this.props.auth);
			});
	}
	render(){
		return (
				<div>
					<div className="signup_component">
						<div className="signup_form_container">
							<h1>User Sign Up</h1>
							<form className="signup_form">
								<TextField
						          id="username"
						          value={this.state.username}
						          onChange={this.handleUsername}
						          label="User Name"
						          margin="normal"
						          style={{width:250}}
						        />
						        <br/>
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
						        <Button raised onClick={this.handleSignup} color="accent" style={{backgroundColor:"rgb(186,0,21)"}}>
							        Sign Up
							    </Button>
							    <br/><br/>
							    <div style={{color:"red"}}>
							    {(this.props.auth.signupError==='')? '' : '* '+this.props.auth.signupError }
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
		signupUser:signupUser,
		signupFail:signupFail,
		signupSuccess:signupSuccess
	},dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SignUp);