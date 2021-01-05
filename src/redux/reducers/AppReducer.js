import firebase from "firebase/app";
import "firebase/auth";

const initialState = {
	isOpenMenu: false,
	isAuth: false,
	name: '',
};

export const AppReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));

	switch (action.type) {
		case 'CHANGE_OPEN_MENU': {
			stateCopy.isOpenMenu = action.isOpenMenu;
			return stateCopy;
		}
		case 'IS_LOGIN': {
			stateCopy.isAuth = action.isLogin;
			return stateCopy
		}
		case 'CHANGE_NAME': {
			stateCopy.name = action.name;
			return stateCopy
		}
		default :
			return state;
	}
};

//CHANGE_OPEN_MENU AC:
export const changeIsOpenMenu = (isOpenMenu) => {
	return {
		type: 'CHANGE_OPEN_MENU',
		isOpenMenu: isOpenMenu
	}
};
//CLOSE_OPEN_MENU AC
export const closeOpenMenu = () => {
	return {
		type: 'CLOSE_OPEN_MENU',
	}
};
//IS_LOGIN AC
export const isLogin = (isLogin) => {
	return {
		type: 'IS_LOGIN',
		isLogin: isLogin,
	}
};
//CHANGE_NAME AC
export const changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name: name,
	}
};

//registration THUNK
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
//checkLogin THUNK
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
// getAuth THUNK
export const getAuth = () => {
	return (dispatch)=>{
			firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch(isLogin(true));
				dispatch(changeName(user.email.slice(0,user.email.indexOf('@'))));
			}
		})
	}
};
// updatePassword THUNK
export const updatePassword = (newPassword) => {
	return (dispatch) => {
		firebase.auth().currentUser.updatePassword(newPassword).then(function () {
			console.log('success')
		}).catch(function (error) {
			console.log('No success')
		});
	}
};
// outLogin THUNK
export const outLogin = () => {
	return (dispatch) => {
		firebase.auth().signOut().then(() => {
			dispatch(isLogin(false));
		}).catch((error) => {
			console.log("ERROR OUT AUTH")
		});
	}
};

// sendPasswordResetEmail THUNK
export const sendPasswordResetEmail = (email) => {
	return (dispatch) => {
		firebase.auth().sendPasswordResetEmail(email).then(function() {
			// Email sent.
		}).catch(function(error) {
			// An error happened.
		});
	}
};

