const initialState = {
	donorList:[],
	selectDonor:{},
	getList:false
}

export default function (state=initialState,action){
	switch(action.type){
		case "GET_DONOR_LIST":
		return {...state,donorList:action.payload,getList:true};
		case "SELECT_DONOR":
		return {...state,selectDonor:action.payload,getList:true};
		default:
		return state;
	}
}