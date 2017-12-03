import React, {Component} from "react";
import "./header.css";
import Button from 'material-ui/Button';
import {Link} from "react-router-dom";
import fb from "../../firebase.js";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

class Header extends Component {
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(){
		fb.auth().signOut();
		this.props.logout();
	}
	render(){
		return (
				<div>
					<div className="navbar">
						<Link to="/donor-list" ><img src="http://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/761/2017/07/06095234/Blood-donation-428x534.jpg" style={{width:200,height:250}} />
						</Link>
						{ (this.props.auth.userAuthenticated)?
						<ul>
							<li>
								<Link to="/register-donor" style={{textDecoration:"none"}}>
								<Button raised color="accent" style={{backgroundColor:"rgb(186,0,21)"}} >
							       {(this.props.auth.registerDonor)? 'MY PROFILE' : 'Register as blood donor' }
							    </Button>
							    </Link>
							</li>
							<li>
								<Button raised onClick={this.handleLogout} color="accent" style={{backgroundColor:"rgb(186,0,21)"}}>
							        Logout
							 	</Button>
							 </li>
						</ul>
						:''
						}
                          <div  className="tag-line">Save a Life, Give Blood !</div>
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
		logout:logout,
	},dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Header);