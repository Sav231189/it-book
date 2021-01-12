import firebase from "firebase/app";
import "firebase/auth";

const initialState = {
	isContextMenu: false,
	isContextMenuSection: false,
	isContextMenuNav: false,
	isContextMenuMain: false,
	isContextMenuLK: false,
	isInitialize: false,
	isAuth: false,
	name: '',
	userId: "",
	showPanel: true,
	loading: true,
};

export const AppReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {

		case 'CHANGE_IS_CONTEXT_MENU': {
			stateCopy.isContextMenu = action.isContextMenu;
			return stateCopy;
		}
		case 'CLOSE_ALL_CONTEXT_MENU': {
			stateCopy.isContextMenu = false;
			stateCopy.isContextMenuSection = false;
			stateCopy.isContextMenuNav = false;
			stateCopy.isContextMenuMain = false;
			stateCopy.isContextMenuLK = false;
			return stateCopy;
		}
		case 'CHANGE_IS_CONTEXT_MENU_SECTION': {
			stateCopy.isContextMenuSection = action.isContextMenuSection;
			return stateCopy;
		}
		case 'CHANGE_IS_CONTEXT_MENU_NAV': {
			stateCopy.isContextMenuNav = action.isContextMenuNav;
			return stateCopy;
		}
		case 'CHANGE_IS_CONTEXT_MENU_MAIN': {
			stateCopy.isContextMenuMain = action.isContextMenuMain;
			return stateCopy;
		}
		case 'CHANGE_IS_CONTEXT_MENU_LK': {
			stateCopy.isContextMenuLK = action.isContextMenuLK;
			return stateCopy;
		}

		case 'IS_AUTH': {
			stateCopy.isAuth = action.isLogin;
			return stateCopy
		}
		case 'IS_INITIALIZE': {
			stateCopy.isInitialize = action.isInitialize;
			return stateCopy
		}
		case 'CHANGE_NAME': {
			stateCopy.name = action.name;
			return stateCopy
		}
		case 'ADD_USER_ID': {
			stateCopy.userId = action.id;
			return stateCopy
		}

		case 'CHANGE_PANEL_SHOW': {
			stateCopy.showPanel = !stateCopy.showPanel;
			return stateCopy;
		}
		case 'CHANGE_LOADING': {
			stateCopy.loading = action.isLogin;
			return stateCopy;
		}
		default :
			return state;
	}
};

//AC CHANGE_OPEN_CONTEXT_MENU:
export const changeIsContextMenu = (isContextMenu) => {
	return {
		type: 'CHANGE_IS_CONTEXT_MENU',
		isContextMenu: isContextMenu,

	}
};
//AC CLOSE_ALL_CONTEXT_MENU:
export const closeAllContextMenu = () => {
	return {
		type: 'CLOSE_ALL_CONTEXT_MENU',
	}
};
//AC CHANGE_IS_SECTION_CONTEXT_MENU:
export const changeIsContextMenuSection = (isContextMenuSection) => {
	return {
		type: 'CHANGE_IS_CONTEXT_MENU_SECTION',
		isContextMenuSection: isContextMenuSection,
	}
};
//AC CHANGE_IS_NAV_CONTEXT_MENU:
export const changeIsContextMenuNav = (isContextMenuNav) => {
	return {
		type: 'CHANGE_IS_CONTEXT_MENU_NAV',
		isContextMenuNav: isContextMenuNav,
	}
};
//AC CHANGE_IS_CONTEXT_MENU_MAIN:
export const changeIsContextMenuMain = (isContextMenuMain) => {
	return {
		type: 'CHANGE_IS_CONTEXT_MENU_MAIN',
		isContextMenuMain: isContextMenuMain,
	}
};
//AC CHANGE_IS_CONTEXT_MENU_LK:
export const changeIsContextMenuLK = (isContextMenuLK) => {
	return {
		type: 'CHANGE_IS_CONTEXT_MENU_LK',
		isContextMenuLK: isContextMenuLK,
	}
};

//IS_LOGIN AC
export const isLogin = (isLogin) => {
	return {
		type: 'IS_AUTH',
		isLogin: isLogin,
	}
};
//IS_INITIALIZE AC
export const changeIsInitializeAC = (isInitialize) => {
	return {
		type: 'IS_INITIALIZE',
		isInitialize: isInitialize,
	}
};
//CHANGE_NAME AC
export const changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name: name,
	}
};
//ADD_USER_ID
export const addUserId = (id) => {
	return {
		type: 'ADD_USER_ID',
		id: id,
	}
};

//THUNK registration
export const registration = (email, password) => {
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
			dispatch(isLogin(true));
			dispatch(changeName(email.slice(0,email.indexOf('@'))));
		})
		.catch((error) => {
			console.log(error.message)
		})
	}
};
//THUNK checkLogin
export const checkLogin = (email,password) => {
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => { if (user) {
				dispatch(isLogin(true));
				dispatch(changeName(email.slice(0,email.indexOf('@'))));
			}
		})
		.catch((error) => {
			dispatch(isLogin(false));
			console.log("ERROR LOGINED")
		})
	}
};
//THUNK getAuth
export const getAuth = () => {
	return (dispatch)=>{
		dispatch(changeIsInitializeAC(false));
			firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch(isLogin(true));
				dispatch(addUserId(user.uid));
				dispatch(changeName(user.email.slice(0,user.email.indexOf('@'))));
			}
			dispatch(changeIsInitializeAC(true));
		});

	}
};
//THUNK  updatePassword
export const updatePassword = (newPassword) => {
	return (dispatch) => {
		firebase.auth().currentUser.updatePassword(newPassword).then(function () {
			console.log('success')
		}).catch(function (error) {
			console.log('No success')
		});
	}
};
//THUNK  outLogin
export const outLogin = () => {
	return (dispatch) => {
		firebase.auth().signOut().then(() => {
			dispatch(isLogin(false));
		}).catch((error) => {
			console.log("ERROR OUT AUTH")
		});
	}
};
//THUNK  sendPasswordResetEmail
export const sendPasswordResetEmail = (email) => {
	return (dispatch) => {
		firebase.auth().sendPasswordResetEmail(email).then(function() {
			// Email sent.
		}).catch(function(error) {
			// An error happened.
		});
	}
};

//AC CHANGE_PANEL_SHOW:
export const changePanelShow = () => {
	return {
		type: 'CHANGE_PANEL_SHOW',
	}
};
//AC CHANGE_LOADING:
export const changeLoading = (isLogin) => {
	return {
		type: 'CHANGE_LOADING',
		isLogin: isLogin,
	}
};