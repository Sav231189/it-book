import firebase from "firebase/app";
import "firebase/auth";
import {closeAllIsOpenContextMenuItemsAC} from "./SectionReducer";

const initialState = {
	isContextMenu: false,
	isContextMenuSection: false,
	isContextMenuNav: false,
	isContextMenuMain: false,
	isContextMenuLK: false,
	isAuth: false,
	userName: '',
	userId: "",
	isShowPanel: true,
	isLoading: true,
	messages: [],
	isDemo: false,
	activeElement: ''
};

export const AppReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {

		case 'CHANGE_IS_CONTEXT_MENU': {
			stateCopy[action.TypeContextMenu] = action.isFlag;
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

		case 'IS_AUTH': {
			stateCopy.isAuth = action.isLogin;
			return stateCopy
		}
		case 'CHANGE_NAME': {
			stateCopy.userName = action.userName;
			return stateCopy
		}
		case 'ADD_USER_ID': {
			stateCopy.userId = action.id;
			return stateCopy
		}

		case 'CHANGE_PANEL_SHOW': {
			stateCopy.isShowPanel = !stateCopy.isShowPanel;
			return stateCopy
		}
		case 'CHANGE_IS_LOADING': {
			stateCopy.isLoading = action.isLoading;
			return stateCopy;
		}
		case 'ADD_MESSAGE': {
			stateCopy.messages.push({
				typeMessage: action.typeMessage,
				textMessage: action.textMessage,
			});
			return stateCopy;
		}
		case 'IS_DEMO': {
			stateCopy.isDemo = action.isDemo;
			return stateCopy;
		}

		case 'CHANGE_ACTIVE_ELEMENT': {
			stateCopy.activeElement = action.id;
			return stateCopy;
		}

		default :
			return state;
	}
};

//AC CHANGE_IS_ACTIVE_ELEMENT:
export const changeActiveElement = (id) => {
	return {
		type: 'CHANGE_ACTIVE_ELEMENT',
		id: id,
	}
};

//AC CHANGE_IS_CONTEXT_MENU:
export const changeIsContextMenuAC = (TypeContextMenu, isFlag) => {
	return {
		type: 'CHANGE_IS_CONTEXT_MENU',
		TypeContextMenu: TypeContextMenu,
		isFlag: isFlag,
	}
};
//AC CLOSE_ALL_CONTEXT_MENU:
export const closeAllContextMenuAC = () => {
	return {
		type: 'CLOSE_ALL_CONTEXT_MENU',
	}
};
//THUNK closeAllContextMenuTHUNK:
export const closeAllContextMenuTHUNK = () => {
	return (dispatch) => {
		dispatch(changeActiveElement(""));
		dispatch(closeAllContextMenuAC());
		dispatch(closeAllIsOpenContextMenuItemsAC());
	}
};

//AC IS_LOGIN
export const isLoginAC = (isLogin) => {
	return {
		type: 'IS_AUTH',
		isLogin: isLogin,
	}
};
//AC CHANGE_NAME
export const changeNameAC = (userName) => {
	return {
		type: 'CHANGE_NAME',
		userName: userName,
	}
};
//AC ADD_USER_ID
export const addUserIdAC = (id) => {
	return {
		type: 'ADD_USER_ID',
		id: id,
	}
};

//THUNK registrationTHUNK
export const registrationTHUNK = (email, password) => {
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
			dispatch(isLoginAC(true));
			dispatch(changeNameAC(data.user.displayName ? data.user.displayName : 'new User'));
			dispatch(addMessageAC('success', `Успешная регистрация на платформе IT-BooK`));
		})
		.catch((error) => {
			dispatch(addMessageAC('error', error.code === "auth/invalid-email" ? "Не верный формат e-mail" : error.message));
		})
	}
};
//THUNK checkLoginTHUNK
export const checkLoginTHUNK = (email, password) => {
	return (dispatch) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
			if (user) {
				dispatch(changeIsLoadingAC(true));
				dispatch(isLoginAC(true));
			}
		})
		.catch((error) => {
			dispatch(isLoginAC(false));
			dispatch(addMessageAC('error', error.message));
		})
	}
};
//THUNK getAuth
export const getAuthTHUNK = () => {
	return (dispatch) => {
		dispatch(changeIsLoadingAC(true));
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch(changeNameAC(user.displayName ? user.displayName : 'new User'));
				dispatch(isLoginAC(true));
				dispatch(addUserIdAC(user.uid));
				dispatch(addMessageAC('success', `Здравствуйте ${user.displayName ? user.displayName : 'new User'}!`));
			} else {
				dispatch(changeIsLoadingAC(false));
			}
		});
	}
};
//THUNK  updateUserNameTHUNK
export const updateUserNameTHUNK = (newName, userId) => {
	return (dispatch) => {
		if (userId !== '') {
			firebase.auth().currentUser.updateProfile({
				displayName: newName,
			}).then(function () {
				dispatch(changeNameAC(newName));
				dispatch(addMessageAC('success', `Успешное изменение имени.`));
			}).catch(function (error) {
				dispatch(addMessageAC('error', `${error.message}`));
			});
		} else {
			dispatch(changeNameAC(newName));
			dispatch(addMessageAC('success', `DEMO MODE! \n Успешное изменение имени.`));
		}
	}
};
//THUNK  updatePasswordTHUNK
export const updatePasswordTHUNK = (newPassword, userId) => {
	return (dispatch) => {
		if (userId !== '') {
			firebase.auth().currentUser.updatePassword(newPassword).then(function () {
				dispatch(addMessageAC('success', `Пароль успешно изменен.`));
			}).catch(function (error) {
				switch (error.code) {
					case "auth/weak-password": {
						dispatch(addMessageAC('error', `Пароль должен состоять из 6 или более символов.`));
						break
					}
					case "auth/requires-recent-login": {
						dispatch(addMessageAC('error', `Учетные данные пользователя больше не действительны. Пользователь должен войти снова.`));
						break
					}
					default: {
						dispatch(addMessageAC('error', `Ошибка изменения пароля. \n \n ${error.message}`));
						break
					}
				}
			});
		}else {
			dispatch(addMessageAC('success', `DEMO MODE! \n Пароль успешно изменен.`));
		}
	}
};
//THUNK  outLoginTHUNK
export const outLoginTHUNK = () => {
	return (dispatch) => {
		dispatch(isDemoAC(false));
		firebase.auth().signOut().then(() => {
			dispatch(addUserIdAC(''));
			dispatch(isLoginAC(false));
			dispatch(addMessageAC('success', `Успешный выход.`));
		}).catch((error) => {
			dispatch(addMessageAC('error', `${error.message}`));
		});
	}
};
//THUNK  sendPasswordResetEmailTHUNK
export const sendPasswordResetEmailTHUNK = (email) => {
	return (dispatch) => {
		firebase.auth().sendPasswordResetEmail(email).then(function () {
			dispatch(addMessageAC('success', `Новый пароль отправлен, проверте почту.`));
		}).catch(function (error) {
			dispatch(addMessageAC('error', `Произошла ошибка, \n\n ${error.message}.`));
		});
	}
};

//AC CHANGE_PANEL_SHOW:
export const changePanelShowAC = () => {
	return {
		type: 'CHANGE_PANEL_SHOW',
	}
};
//AC CHANGE_LOADING:
export const changeIsLoadingAC = (isLoading) => {
	return {
		type: 'CHANGE_IS_LOADING',
		isLoading: isLoading,
	}
};
//AC ADD_MESSAGE:
export const addMessageAC = (typeMessage, textMessage) => {
	return {
		type: 'ADD_MESSAGE',
		typeMessage: typeMessage,
		textMessage: textMessage,
	}
};
//AC IS_DEMO:
export const isDemoAC = (isDemo) => {
	return {
		type: 'IS_DEMO',
		isDemo: isDemo,
	}
};

