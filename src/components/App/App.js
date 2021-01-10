import React, {useEffect} from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {connect} from "react-redux";
import {
	changeIsContextMenu, changePanelShow,
	checkLogin, closeAllContextMenu,
	getAuth,
	outLogin,
	registration, sendPasswordResetEmail, updatePassword
} from "../../redux/reducers/AppReducer";
import {Main} from "../Main/Main";
import {Start} from "../Start/Start";
import {closeAllIsOpenContextMenu} from "../../redux/reducers/SectionReducer";

function AppComponent(props) {

	useEffect(() => {
		props.getAuth();
	}, []);

	const closeAllMenu = (e) => {
		if (props.isContextMenu) {
			props.changeIsContextMenu(false);
			props.closeAllContextMenu();
			props.closeAllIsOpenContextMenu();
		}
	};

	return (
		<div className="app" >
			{!props.isAuth
				?
				<Start checkLogin={props.checkLogin}
							 sendPasswordResetEmail={props.sendPasswordResetEmail}
							 registration={props.registration}
				/>
				:
				<div className="app" onClick={closeAllMenu} onContextMenu={closeAllMenu}>

					<Header outLogin={props.outLogin} name={props.name}
									updatePassword={props.updatePassword}/>

					<div className='appWindow'>
						<Panel showPanel={props.showPanel} userId={props.userId}/>
						<PanelMoreBtn changePanelShow={props.changePanelShow}/>
						<Main />
					</div>

				</div>
			}
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,
		showPanel: state.app.showPanel,
		isAuth: state.app.isAuth,
		name: state.app.name,
	}
};
export const App = connect(mstp, {
	changeIsContextMenu,
	closeAllContextMenu,
	closeAllIsOpenContextMenu,

	checkLogin,
	outLogin,
	getAuth,
	registration,
	updatePassword,
	sendPasswordResetEmail,

	changePanelShow,
})(AppComponent);
