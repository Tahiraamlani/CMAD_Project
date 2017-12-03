export const loginUser = (user)=>{
	console.log(user);
	return {
		type:"LOGIN_USER",
		payload:user
	}
}

export const loginFail = (error)=>{
	console.log(error);
	return {
		type:"LOGIN_FAIL",
		payload:error
	}
}

export const loginSuccess = ()=>{
	return {
		type:"LOGIN_SUCCESS",
	}
}

export const signupUser = (user)=>{
	console.log(user);
	return {
		type:"SIGNUP_USER",
		payload:user
	}
}

export const signupFail = (error)=>{
	return {
		type:"SIGNUP_FAIL",
		payload:error
	}
}

export const signupSuccess = (user)=>{
	console.log(user);
	return {
		type:"SIGNUP_SUCCESS",
		payload:user
	}
}

export const registerDonor = (donor)=>{
	console.log(donor);
	return {
		type:"REGISTER_DONOR",
		payload:donor
	}
}

export const registerDonorFail = (error)=>{
	console.log(error);
	return {
		type:"REGISTER_DONOR_FAIL",
		payload:error
	}
}

export const registerDonorSuccess = (donor)=>{
	console.log(donor);
	return {
		type:"REGISTER_DONOR_SUCCESS",
		payload:donor
	}
}

export const logout = ()=>{
	return {
		type:"LOGOUT",
	}
}