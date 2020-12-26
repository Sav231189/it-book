const initialState = {
	items: [
		{
			name: 'HTML',
			url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Html5_dise%C3%B1o_web.png',
			position: 0,
			isMenuSectionItem: false,
		},
		{
			name: 'CSS',
			url: 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-css-vector-icon-png-image_3751506.jpg',
			position: 1,
			isMenuSectionItem: false,
		},
	],
	isMenuSection: false,
};

export const SectionReducer = (state = initialState, action) => {

	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'MENU_SECTION_SHOW': {
			stateCopy.isMenuSection = true;
			return stateCopy;
		}
		case 'MENU_SECTION_ITEM_SHOW': {
			stateCopy.items[action.position].isMenuSectionItem = true;
			return stateCopy;
		}
		case 'CLOSE_OPEN_MENU': {
			stateCopy.isMenuSection = false;
			stateCopy.items.map(el=>{el.isMenuSectionItem = false;});
			return stateCopy;
		}
		default :
			return state;
	}
};

//menuSectionShow AC:
export const menuSectionShow = () => {
	return {
		type: 'MENU_SECTION_SHOW',
	}
};
//menuSectionItemShow AC:
export const menuSectionItemShow = (position) => {
	return {
		type: 'MENU_SECTION_ITEM_SHOW',
		position: position,
	}
};
