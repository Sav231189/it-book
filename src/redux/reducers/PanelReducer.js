const initialState = {
	showPanel: true,
};

export const PanelReducer = (state = initialState, action) => {
	let stateCopy = { ...state };
	switch (action.type){
		case 'CHANGE_PANEL_SHOW': {
			stateCopy.showPanel = !stateCopy.showPanel;
			return stateCopy;
		}
		default : return state;
	}
};


//AC CHANGE_PANEL_SHOW:
export const changePanelShow = () => {
	return {
		type: 'CHANGE_PANEL_SHOW',
	}
};
