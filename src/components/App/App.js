import React, {useEffect,useState} from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {connect} from "react-redux";
import {
	changeIsContextMenu,
	checkLogin, closeAllContextMenu,
	getAuth,
	outLogin,
	registration, sendPasswordResetEmail, updatePassword
} from "../../redux/reducers/AppReducer";
import {Main} from "../Main/Main";
import {Start} from "../Start/Start";
import {changePanelShow} from "../../redux/reducers/PanelReducer";
import {closeAllIsOpenContextMenu} from "../../redux/reducers/SectionReducer";

function AppComponent(props) {

	useEffect(() => {
		props.getAuth();
	}, []);

	const closeAllMenu = (e) => {
		console.log("app click")
		if (props.isContextMenu) {
			props.changeIsContextMenu(false);
			props.closeAllContextMenu();
			props.closeAllIsOpenContextMenu();
		}
	};

	return (
		<div>
			{!props.isAuth
				?
				<Start checkLogin={props.checkLogin}
							 sendPasswordResetEmail={props.sendPasswordResetEmail}
							 registration={props.registration}
				/>
				:
				<div className="app" onClick={closeAllMenu} onContextMenu={closeAllMenu}>

					<Header outLogin={props.outLogin} name={props.name}
									updatePassword={props.updatePassword}
					/>

					<Panel showPanel={props.showPanel} userId={props.userId}/>
					<PanelMoreBtn changePanelShow={props.changePanelShow}/>

					{/*<div className='mainBox' style={!props.panelShow ? {width: 'calc(100% - 10px)'} : null}>*/}
					{/*	<Main/>*/}
					{/*</div>*/}

				</div>
			}
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,

		showPanel: state.panel.showPanel,
		isAuth: state.app.isAuth,
		name: state.app.name,
	}
};
export const App = connect(mstp, {
	changeIsContextMenu,
	closeAllContextMenu,
	closeAllIsOpenContextMenu,

	changePanelShow,

	checkLogin,
	outLogin,
	getAuth,
	registration,
	updatePassword,
	sendPasswordResetEmail,
})(AppComponent);
