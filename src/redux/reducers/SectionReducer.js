const initialState = {
	items: [
		{
			name: 'HTML',
			url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Html5_dise%C3%B1o_web.png',
			position: 0,
			isMenuSectionItem: false,
			isChangeSectionItem: false,
		},
		{
			name: 'CSS',
			url: 'https://lh3.googleusercontent.com/RgLNxSnwibzKuEcPUTLul7fvrJMK-bkG-4CpPQugJ6jrBdVIrj48j0p-ofOyF23rRx_iOHo=s48',
			position: 1,
			isMenuSectionItem: false,
			isChangeSectionItem: false,
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
		case 'ADD_SECTION_ITEM': {
			stateCopy.items.push({
				name: 'Name',
				url: 'https://lh3.googleusercontent.com/RgLNxSnwibzKuEcPUTLul7fvrJMK-bkG-4CpPQugJ6jrBdVIrj48j0p-ofOyF23rRx_iOHo=s48',
				position: stateCopy.items.length,
				isMenuSectionItem: false,
			});
			return stateCopy;
		}
		case 'DELETE_SECTION_ITEM': {
			stateCopy.items.splice(action.position,1);
			return stateCopy;
		}
		case 'SHOW_CHANGE_SECTION_ITEM': {
			stateCopy.items[action.position].isChangeSectionItem = true;
			return stateCopy;
		}
		case 'UN_SHOW_CHANGE_SECTION_ITEM': {
			stateCopy.items.map(el => {el.isChangeSectionItem = false})
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
//addSectionItem AC:
export const addSectionItem = () => {
	return {
		type: 'ADD_SECTION_ITEM',
	}
};
//deleteSectionItem AC:
export const deleteSectionItem = (position) => {
	return {
		type: 'DELETE_SECTION_ITEM',
		position: position,
	}
};
//showChangeSectionItem AC:
export const showChangeSectionItem = (position) => {
	return {
		type: 'SHOW_CHANGE_SECTION_ITEM',
		position: position,
	}
};
//unShowChangeSectionItem AC:
export const unShowChangeSectionItem = () => {
	return {
		type: 'UN_SHOW_CHANGE_SECTION_ITEM',
	}
};
