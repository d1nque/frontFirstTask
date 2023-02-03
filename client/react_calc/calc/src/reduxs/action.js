const setData = (content) => {
	return {
		type: "SET_DATA",
		content
	}
}


const appendData = (obj) => {
	console.log(obj);
	return (dispatch) => {
		console.log(dispatch);
		dispatch(setData(obj));
	}
}

export {
	appendData, setData
}