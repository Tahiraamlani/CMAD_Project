export const getDonorList = (list) => {
	return {
		type:"GET_DONOR_LIST",
		payload:list
	}
}

export const selectDonor = (donor) => {
	return {
		type:"SELECT_DONOR",
		payload:donor
	}
}