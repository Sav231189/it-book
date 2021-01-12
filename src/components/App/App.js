import React, {useEffect} from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
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
import loading from '../../img/ loading.gif';

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
		<div className="app">
			{ !props.isInitialize
				?
				<div className={`loadingApp ${props.loading}`}>
					<div><img src={loading} alt="loading"/></div>
				</div>
				:
				<div>
					{!props.isAuth
						?
						<Start checkLogin={props.checkLogin}
									 sendPasswordResetEmail={props.sendPasswordResetEmail}
									 registration={props.registration}
						/>
						:
						<div className="app" onClick={closeAllMenu} onContextMenu={closeAllMenu}>
							<Header/>
							<div className='appWindow'>
								<div className={`loadingApp ${props.loading}`}>
									<div className='addHeader'>
										<img src={loading} alt="loading"/>
									</div>
								</div>
								<Panel showPanel={props.showPanel} userId={props.userId}/>
								<Main/>
							</div>
						</div>
					}
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
		loading: state.app.loading,
		userId: state.app.userId,
		isInitialize: state.app.isInitialize,
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
})(AppComponent);
