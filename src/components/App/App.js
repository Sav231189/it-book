import React, {useEffect} from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {connect} from "react-redux";
import {
	changeIsOpenMenu,
	checkLogin,
	closeOpenMenu,
	getAuth,
	outLogin,
	registration, sendPasswordResetEmail, updatePassword
} from "../../redux/reducers/AppReducer";
import {closeAllIsOpenContextMenu} from "../../redux/reducers/SectionReducer";
import {Main} from "../Main/Main";
import {Start} from "../Start/Start";

function AppComponent(props) {

	useEffect(() => {
		props.getAuth();
	}, [])

	const closeAllMenu = (e) => {
		if (props.isOpenMenu) {
			props.closeOpenMenu();
			props.closeAllIsOpenContextMenu();
			props.changeIsOpenMenu(false);
		}
	};

	return (
		<div>
			{!props.isAuth
				?
				<Start checkLogin={props.checkLogin} sendPasswordResetEmail={props.sendPasswordResetEmail} registration={props.registration}/>
				:
				<div className="app" onClick={closeAllMenu} onContextMenu={closeAllMenu}>
					<Header outLogin={props.outLogin} name={props.name} updatePassword={props.updatePassword}/>
					<Panel/>
					<PanelMoreBtn/>
					<div className='mainBox' style={!props.panelShow ? {width: 'calc(100% - 10px)'} : null}>
						<Main/>
					</div>
				</div>
			}
		</div>
	);
}

const mstp = (state) => {
	return {
		isOpenMenu: state.app.isOpenMenu,
		panelShow: state.panel.show,
		isAuth: state.app.isAuth,
		name: state.app.name,
	}
};
const mdtp = (dispatch) => {
	return {
		closeOpenMenu,
		changeIsOpenMenu,
		closeAllIsOpenContextMenu,
		checkLogin,
		// checkLogin: (email,password) => checkLogin(email,password)(dispatch),
		outLogin: () => outLogin(dispatch),
		getAuth: () => getAuth(dispatch),
		registration: (email, password) => registration(email, password)(dispatch),
	}
};
export const App = connect(mstp, {
	closeOpenMenu,
	changeIsOpenMenu,
	closeAllIsOpenContextMenu,
	checkLogin,
	outLogin,
	getAuth,
	registration,
	updatePassword,
	sendPasswordResetEmail,
})(AppComponent);
