import React, {useEffect} from "react";
import {connect} from "react-redux";
import {closeAllContextMenuTHUNK, getAuthTHUNK} from "../../redux/reducers/AppReducer";
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {Main} from "../Main/Main";
import {Start} from "../Start/Start";
import './App.css';
import {getIsAuth, getIsContextMenu,	getIsShowPanel} from "../../selectors/AppSelector";
import {Loading} from "../Loading/Loading";



function AppComponent(props) {

	useEffect(props.getAuthTHUNK, []);

	return (
		<div className="app">
			<Loading/>
			{!props.isAuth ?
				<Start/>
				:
				<div className="app" onClick={props.closeAllContextMenuTHUNK} onContextMenu={props.closeAllContextMenuTHUNK}>
					<Header/>
					<div className='appWindow'>
						<Panel isShowPanel={props.isShowPanel}/>
						<Main/>
					</div>
				</div>
			}
		</div>
	);
}

export const App = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		isShowPanel: getIsShowPanel(state),
		isAuth: getIsAuth(state),
	}), {
		closeAllContextMenuTHUNK,
		getAuthTHUNK,
	})(AppComponent);
