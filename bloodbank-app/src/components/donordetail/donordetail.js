import React, {Component} from"react";
import "./donordetail.css";
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {connect} from "react-redux";
import Button from 'material-ui/Button';


class DonarDetail extends Component {


backToDonar(){
	this.props.history.push("/donor-list");
}

	render (){
		return(
				<div>
					<div className="donardetail_component">
						<div className="donardetail_container">
							 <h1>Donar Detail</h1>
							{(this.props.donor.selectDonor.name===undefined)?
							<p style={{padding:20}}>Select Blood Group First and Click Details..</p>
							:
							<div>
								<Table>
								        <TableHead>
								        </TableHead>
								        <TableBody className="donarlist_table">
								          <TableRow>
								            <TableCell className="styling1">Name:</TableCell> 
														<TableCell className= "styling2">{this.props.donor.selectDonor.name}</TableCell>
								          </TableRow>
								          <TableRow>
								            <TableCell className= "styling1">Blood Group:</TableCell> 
														<TableCell className= "styling2">{this.props.donor.selectDonor.blood_group}</TableCell>
								          </TableRow>
								          <TableRow>
								            <TableCell className= "styling1">Contact:</TableCell>  
														<TableCell className= "styling2">{this.props.donor.selectDonor.mobile_no}</TableCell>
								          </TableRow>
								          <TableRow>
								            <TableCell className= "styling1">City:</TableCell>  
														<TableCell className= "styling2">{this.props.donor.selectDonor.city}</TableCell>
								          </TableRow>
								          <TableRow>
								            <TableCell className= "styling1">Area:</TableCell>  
														<TableCell className= "styling2">{this.props.donor.selectDonor.area}</TableCell>
								          </TableRow>
								      
								        </TableBody>
								      </Table>
							</div>
							}
							<br/> <br/>
							<Button raised color="accent" style={{backgroundColor:"rgb(186,0,21)"}} onClick={this.backToDonar.bind(this)}> Back </Button>

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

export default connect(mapStateToProps)(DonarDetail);