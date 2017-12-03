import React, {Component} from "react";
import "./registerdonor.css";
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import fb from "../../firebase.js";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loginSuccess, registerDonorSuccess, registerDonorFail} from "../../actions/auth";

class RegisterDonor extends Component {
	constructor(){
		super();
	}
	state = {
	name:'',
	mobile_no:'',
	city:'',
	area:'',
    blood_group:null,
    error:''
  	};

  	handleName = (event) => {
    this.setState({ name: event.target.value });
  	};

  	handleMobile = (event) => {
    this.setState({ mobile_no: event.target.value });
  	};

  	handleCity = (event) => {
    this.setState({ city: event.target.value });
  	};

  	handleArea = (event) => {
    this.setState({ area: event.target.value });
  	};

  	handleBloodgroup = (event) => {
    this.setState({ blood_group: event.target.value });
  	};

  	handleRegister = () => {
  		if((this.state.name==='')||(this.state.mobile_no==='')||(this.state.city==='')||(this.state.area==='')||(this.state.blood_group==='')){
  			this.setState({
  				error:"* All fields are required."
  			})
  		}else{
  			this.setState({
  				error:""
  			});
  			var ref = fb.database().ref().child('donors').child(fb.auth().currentUser.uid);
  			ref.set({
  				name:this.state.name,
  				mobile_no:this.state.mobile_no,
  				city:this.state.city,
  				area:this.state.area,
  				blood_group:this.state.blood_group,
  			},(error)=>{
  				if(error){
  					this.props.registerDonorFail(error);
  				}else{
  					this.props.registerDonorSuccess("Registered successfully !");
  				}
  			});
  		}
  	}

  	componentWillMount(){
		fb.auth().onAuthStateChanged((user)=>{
		  if (!user) {
		    this.props.history.push('/');
		  }else{
		  	this.props.loginSuccess();
		  	if(fb.database().ref().child('donors').child(user.uid)){
		  		fb.database().ref().child('donors').child(user.uid).on("value", (snapshot)=> {
		  			if(snapshot.val()!==null){
		  			this.props.registerDonorSuccess();
				  this.setState({
  						name:snapshot.val().name,
						mobile_no:snapshot.val().mobile_no,
						city:snapshot.val().city,
						area:snapshot.val().area,
					    blood_group:snapshot.val().blood_group,
  					})
				}
				}, function (errorObject) {
				  console.log("The read failed: " + errorObject.code);
				});
		  	}
		  }
		});
	}

	render(){
		var blood_group = [
        "A+",
        "B+",
        "AB+",
        "O+",
        "A-",
        "B-",
        "AB-",
        "O-"
		];
		return (
				<div>
					<div className="registerdonor_component">
						<div className="registerdonor_form_container">
							<h1>Register as Blood Donor</h1>
							<form className="registerdonor_form">
								<TextField
						          id="name"
						          value={this.state.name}
						          onChange={this.handleName}
						          label="Full Name"
						          margin="normal"
						          style={{width:250}}
						        />
						        <TextField
						          id="mobile_no"
						          value={this.state.mobile_no}
						          onChange={this.handleMobile}
						          label="Mobile No"
						          margin="normal"
						          style={{width:250}}
						        />
						        <TextField
						          id="city"
						          value={this.state.city}
						          onChange={this.handleCity}
						          label="City"
						          margin="normal"
						          style={{width:250}}
						        />
						        <TextField
						          id="area"
						          value={this.state.area}
						          onChange={this.handleArea}
						          label="Area"
						          margin="normal"
						          style={{width:250}}
						        />
						        <br/> <br/>
						        <InputLabel htmlFor="age-simple">Blood Group </InputLabel>
							          <Select
							            value={this.state.blood_group}
							            onChange={this.handleBloodgroup}
							            style={{width:150}}
							            input={<Input id="age-simple" />}
							          >
							          	{blood_group.map((blood_group)=>{
							          		return <MenuItem value={blood_group}>{blood_group}</MenuItem>;
							          	})}
							          </Select>
						        <br/><br/>
						        <Button raised onClick={this.handleRegister} color="accent" style={{backgroundColor:"rgb(186,0,21)"}}>
							        Register
							    </Button>
							    <br/><br/>
							    <div style={{color:"red"}}>
							    {this.state.error}
							    {this.props.auth.registerMessage}
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
		loginSuccess:loginSuccess,
		registerDonorFail:registerDonorFail,
		registerDonorSuccess:registerDonorSuccess
	},dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(RegisterDonor);