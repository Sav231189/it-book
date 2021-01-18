import React, {useState} from 'react';
import {connect} from "react-redux";
import {
	addMessageAC, changeIsContextMenuAC, changePanelShowAC, isDemoAC,
	outLoginTHUNK, updatePasswordTHUNK, updateUserNameTHUNK
} from "../../redux/reducers/AppReducer";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {
	getIsContextMenu, getIsContextMenuLK, getIsDemo,
	getUserId, getUserName
} from "../../selectors/AppSelector";
import './Header.css';
import user from '../../img/user.png';

export function HeaderComponent(props) {

	const [newPassword, setNewPassword] = useState('');
	const [isChangePassword, setIsChangePassword] = useState(false);

	const [newName, setNewName] = useState('');
	const [isChangeName, setIsChangeName] = useState(false);

	const menu = (e) => {
		setIsChangeName(false);
		setNewName("");
		setIsChangePassword(false);
		setNewPassword("");
		if (!props.isContextMenu && !props.isContextMenuLK) {
			props.changeIsContextMenuAC("isContextMenu", true);
			props.changeIsContextMenuAC("isContextMenuLK", true);
			e.preventDefault();
			e.stopPropagation();
		} else {
			props.changeIsContextMenuAC("isContextMenu", false);
			props.changeIsContextMenuAC("isContextMenuLK", false);
		}
	};
	const changeNameMode = (e) => {
		setIsChangeName(true);
		setIsChangePassword(false);
		e.preventDefault();
		e.stopPropagation();
	};
	const changePasswordMode = (e) => {
		setIsChangePassword(true);
		setIsChangeName(false);
		e.preventDefault();
		e.stopPropagation();
	};
	const updateName = (e) => {
		props.updateUserNameTHUNK(newName, props.userId);
		setNewName('');
		setIsChangeName(false);
		e.stopPropagation()
	};
	const updatePassword = (e) => {
		props.updatePasswordTHUNK(newPassword, props.userId);
		setNewPassword('');
		setIsChangePassword(false);
		e.stopPropagation()
	};

	return (
		<div className="Header">
			<PanelMoreBtn changePanelShow={props.changePanelShowAC}/>
			{!props.isDemo ? <span className="logo">IT - BooK</span> :
				<div className="demoLogo">
					<span>Все изменения будут удаленый после выхода!</span>
					<button onClick={() => props.isDemoAC(false)}> EXIT</button>
				</div>
			}
			<div className="lk" onPointerDown={menu}>
				<img src={user} alt={'user'}/>
			</div>
			<div className="contextMenu contextMenuLK"
					 style={props.isContextMenuLK ? {display: 'block'} : {display: 'none'}}>
				<div className="menuName">{props.userName !== '' ? props.userName : 'no Name'}</div>
				<hr/>
				{!isChangeName ? <div><span className="menuItem" onPointerDown={changeNameMode}> Change Name </span></div>
					: <div>
						<form action="#"><input type="text" maxLength={16}
																		onPointerDown={e=>e.stopPropagation()}
																		placeholder='new Name'
																		onChange={(e) => setNewName(e.currentTarget.value)} value={newName}/>
							<button className="menuItem save_btn" onPointerDown={updateName}>Save</button>
						</form>
					</div>
				}
				<hr/>
				{!isChangePassword ? <div><span className="menuItem" onPointerDown={changePasswordMode}> New Password </span></div>
					: <div>
						<form action="#"><input type="text" maxLength={24}
																		onPointerDown={e=>e.stopPropagation()} placeholder='new Password'
																		onChange={(e) => setNewPassword(e.currentTarget.value)} value={newPassword}/>
							<button className="menuItem save_btn" onPointerDown={updatePassword}>Save</button>
						</form>
					</div>
				}
				<hr/>
				<span className="menuItem" onPointerDown={props.outLoginTHUNK}>Out</span>
			</div>
		</div>
	);
}

export const Header = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		isContextMenuLK: getIsContextMenuLK(state),
		userId: getUserId(state),
		userName: getUserName(state),
		isDemo: getIsDemo(state),
	}), {
		changeIsContextMenuAC,
		outLoginTHUNK,
		updateUserNameTHUNK,
		updatePasswordTHUNK,
		changePanelShowAC,
		addMessageAC,
		isDemoAC,
	})(HeaderComponent);