import React, {useState} from 'react';
import './Header.css';
import user from '../../img/user.png';
import {connect} from "react-redux";
import {
	changeIsContextMenuAC, changeIsContextMenuLK,
	changePanelShow,
	outLogin,
	updatePassword
} from "../../redux/reducers/AppReducer";

import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {getIsContextMenu, getIsContextMenuLK, getUserId, getUserName} from "../../selectors/AppSelector";

export function HeaderComponent(props) {

	const [newPassword, setNewPassword] = useState('');

	const [isChangePassword, setIsChangePassword] = useState(false);

	const [newName, setNewName] = useState('');

	const [isChangeName, setIsChangeName] = useState(false);

	const menu = (e) => {
		setIsChangePassword(false);
		setNewPassword("");
		if (!props.isContextMenu && !props.isContextMenuLK) {
			props.changeIsContextMenuAC(true);
			props.changeIsContextMenuLK(true);
		} else {
			props.changeIsContextMenuAC(false);
			props.changeIsContextMenuLK(false);
		}
		e.preventDefault();
		e.stopPropagation();
	};

	const changePasswordMode = (e) => {
		setIsChangePassword(true);
		e.preventDefault();
		e.stopPropagation();
	};

	const updatePassword = () => {
		props.updatePassword(newPassword);
		setNewPassword('');
		setIsChangePassword(false);
	};
	const updateName = () => {
		setNewName('');
		setIsChangeName(false);
	};

	return (
		<div className="Header">
			<PanelMoreBtn changePanelShow={props.changePanelShow}/>
			<span className="logo">IT - BooK</span>
			<div className="lk" onClick={menu} onContextMenu={menu}>
				<img src={user} alt={'user'}/>
			</div>
			<div className="contextMenu contextMenuLK"
					 style={props.isContextMenuLK ? {display: 'block'} : {display: 'none'}}>
				<div className="menuName">{props.userName}</div>
				<hr/>
				{!isChangeName ? <div><span className="menuItem" onClick={setIsChangeName}> Change Name </span></div>
					: <div><input type="text" maxLength={24} onClick={setIsChangeName} placeholder='new Name'
												onChange={(e) => setNewName(e.currentTarget.value)} value={newName}/>
						<span className="menuItem save_btn" onClick={updateName}>Save</span>
						<hr/>
					</div>
				}
				{!isChangePassword ? <div><span className="menuItem" onClick={changePasswordMode}> New Password </span></div>
					: <div><input type="text" maxLength={24} onClick={changePasswordMode} placeholder='new Password'
												onChange={(e) => setNewPassword(e.currentTarget.value)} value={newPassword}/>
						<span className="menuItem save_btn" onClick={updatePassword}>Save</span>
						<hr/>
					</div>
				}
				<hr/>
				<span className="menuItem" onClick={props.outLogin}>Out</span>
			</div>
		</div>
	);
}

export const Header = connect(
	(state) => {
		return {
			isContextMenu: getIsContextMenu(state),
			isContextMenuLK: getIsContextMenuLK(state),
			userId: getUserId(state),
			userName: getUserName(state),
		}
	},
	{
		changeIsContextMenuAC,
		changeIsContextMenuLK,
		outLogin,
		updatePassword,
		changePanelShow,
	}
)(HeaderComponent);