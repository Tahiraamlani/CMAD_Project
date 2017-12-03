const initialState = {
	userAuthenticated:false,
	userSignup:false,
	registerDonor:false,
	loginError:'',
	signupError:'',
	registerMessage:'',
	user:{}

}

export default function (state=initialState,action){
	switch(action.type){
		case "LOGIN_USER":
		return {...state,userAuthenticated:false,processing:true};
		case "LOGIN_FAIL":
		return {...state,userAuthenticated:false,processing:false,loginError:action.payload};
		case "LOGIN_SUCCESS":
		return {...state,userAuthenticated:true,processing:false,loginError:''};
		case "SIGNUP_USER":
		return {...state,userAuthenticated:false,processing:true,signupError:''};
		case "SIGNUP_FAIL":
		return {...state,userAuthenticated:false,processing:false,userSignup:false,signupError:action.payload};
		case "SIGNUP_SUCCESS":
		return {...state,userAuthenticated:false,processing:false,userSignup:true,signupError:'',user:action.payload};
		case "REGISTER_DONOR":
		return {...state,userAuthenticated:true,processing:true,registerMessage:''};
		case "REGISTER_DONOR_SUCCESS":
		return {...state,userAuthenticated:true,processing:false,registerDonor:true,registerMessage:action.payload};
		case "REGISTER_DONOR_FAIL":
		return {...state,userAuthenticated:true,processing:false,registerDonor:false,registerMessage:action.payload};
		case "LOGOUT":
		return {...state,userAuthenticated:false,processing:false,userSignup:false,registerDonor:false,loginError:'',signupError:'',registerMessage:''};
		default:
		return state;
	}
}