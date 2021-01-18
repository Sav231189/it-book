import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {Main} from "../Main/Main";
import {Start} from "../Start/Start";
import {Loading} from "../Loading/Loading";
import {getIsAuth, getIsContextMenu, getIsDemo, getIsShowPanel} from "../../selectors/AppSelector";
import {closeAllContextMenuTHUNK, getAuthTHUNK} from "../../redux/reducers/AppReducer";
import './App.css';
import {Message} from "../Message/Message";

function AppComponent(props) {

	useEffect(props.getAuthTHUNK, []);

	return (
		<div className="app">
			<Loading/>
			<Message/>
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
			{props.isDemo && !props.isAuth &&
			<div className="app" onPointerDown={props.closeAllContextMenuTHUNK} onContextMenu={props.closeAllContextMenuTHUNK}>
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
		isDemo: getIsDemo(state),
	}), {
		closeAllContextMenuTHUNK,
		getAuthTHUNK,
	})(AppComponent);
