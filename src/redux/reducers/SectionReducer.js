const initialState = {
	items: [
		{
			name: 'HTML',
			url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Html5_dise%C3%B1o_web.png',
			position: 0,
		},
		{
			name: 'CSS',
			url: 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-css-vector-icon-png-image_3751506.jpg',
			position: 2,
		},
	],

};

export const SectionReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type){
		case 'PANEL_SHOW_CHANGE': {
			stateCopy.show = !stateCopy.show;
			return stateCopy;
		}
		default : return state;
	}
};

//Panel AC:
// export const panelShowChange = () => {
// 	return {
// 		type: 'PANEL_SHOW_CHANGE',
// 	}
// };
