import React, {Component} from "react";
import "./donorlist.css";
import bloodgroups from "../../bloodgroup.js";
import DonarDetail from "../donordetail/donordetail";
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
// import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
// import {Redirect} from "react-router-dom";
import fb from "../../firebase.js";
import {logout, loginSuccess, registerDonorSuccess} from "../../actions/auth";
import {getDonorList,selectDonor} from "../../actions/donor";
import Button from 'material-ui/Button';


class DonarList extends Component {
	constructor(props){
		super(props);
	}
	state = {
    blood_group: '',
  	};

	  selectDonor = (donor)=>{
		this.props.history.push('/donor-detail');
  		this.props.selectDonor(donor);
  	}

  	handleChange = (event, hello) => {
  		var donor_list = [];
	    this.setState({ blood_group: event.target.value });
	   fb.database().ref().child('donors/').orderByChild("blood_group").equalTo(event.target.value).on("value", (snapshot)=> {
		  			snapshot.forEach((donor)=>{
		  				donor_list.push(donor.val());
		  			})
		  			this.props.getDonorList(donor_list);
		});
		//this.props.getDonorList(donor_list);
  	};


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
				}
				});
		  	}
		  }
		});
  	}
  
	render(){
		return (
				<div>
					<div className="donarlist_component">
						<div className="donarlist_container">
							<h1>Find Donar</h1>
							<div className="donarlist">
								
								<div className="donarlist_preview">
									<span className="selection_group"> Select Blood Group </span>
							          <Select
							            value={this.state.blood_group}
							            onChange={this.handleChange}
							            input={<Input id="age-simple" />}
							          >
							          	{bloodgroups.bloodgroups.map((blood_group,key)=>{
											  return <MenuItem value={blood_group} key={key}>{blood_group}</MenuItem>;
							          	})}
							          </Select>
									  <br/> <br/> <br/> <br/>
							          {(this.props.donor.getList===false)
							          	?

							          	<img style={{width: 700}} src="http://pec.ac.in/sites/default/files/cover_images/blood_donation_camp.png" />
							          	:
							          <Table>
								        <TableHead >
										<TableRow>
								        	<TableCell style={{textAlign:"center",fontSize:"20px"}}>Donor Name</TableCell>
								            <TableCell style={{textAlign:"center",fontSize:"20px"}}>Blood Group</TableCell>
								            <TableCell style={{textAlign:"center",fontSize:"20px"}}>City</TableCell>
											<TableCell ></TableCell>
										</TableRow>
								        </TableHead>
								        <TableBody className="donarlist_table">
								          {this.props.donor.donorList.map((donor, key)=>{
											  return <TableRow key={key}>
								            <TableCell style={{textAlign:"center"}}>{donor.name}</TableCell>
								            <TableCell style={{textAlign:"center"}}>{donor.blood_group}</TableCell>
								            <TableCell style={{textAlign:"center"}}>{donor.city}</TableCell>
											<TableCell style={{textAlign:"center"}}><Button raised color="accent" style={{backgroundColor:"rgb(186,0,21)"}} onClick={()=>this.selectDonor(donor)} > Details </Button></TableCell>
								          </TableRow>
								          })}
								        </TableBody>
								      </Table>
								  	}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

function mapStateToProps(state){
	return {
		auth:state.auth,
		donor:state.donor	
	}
}

function matchDispatchToProps(dispatch){
	return bindActionCreators({
		getDonorList:getDonorList,
		selectDonor:selectDonor,
		logout:logout,
		loginSuccess:loginSuccess,
		registerDonorSuccess:registerDonorSuccess
	},dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DonarList);