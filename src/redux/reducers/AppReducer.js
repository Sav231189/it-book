const initialState = {
	isOpenMenu: false,
};

export const AppReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));

	switch (action.type){
		case 'CHANGE_OPEN_MENU': {
			stateCopy.isOpenMenu = action.isOpenMenu;
			return stateCopy;
		}
		default : return state;
	}
};

//CHANGE_OPEN_MENU AC:
export const changeIsOpenMenu = (isOpenMenu) => {
	return {
		type: 'CHANGE_OPEN_MENU',
		isOpenMenu: isOpenMenu
	}
};
//CLOSE_OPEN_MENU
export const closeOpenMenu = () => {
	return {
		type: 'CLOSE_OPEN_MENU',
	}
};
