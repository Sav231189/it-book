const initialState = {
	show: true,
};

export const PanelReducer = (state = initialState, action) => {
	let stateCopy = { ...state };
	switch (action.type){
		case 'PANEL_SHOW_CHANGE': {
			stateCopy.show = !stateCopy.show;
			return stateCopy;
		}
		default : return state;
	}
};


//Panel AC:
export const panelShowChange = () => {
	return {
		type: 'PANEL_SHOW_CHANGE',
	}
};
