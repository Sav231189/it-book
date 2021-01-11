import React, {useState} from 'react';
import './Header.css';
import user from '../../img/user.png';
import {connect} from "react-redux";
import {getActiveSectionItem} from "../../selectors/NavSelector";
import {
	changeIsContextMenu, changeIsContextMenuLK,
	changePanelShow,
	getAuth,
	outLogin,
	registration,
	updatePassword
} from "../../redux/reducers/AppReducer";
import {
	addBlockInActiveFile,
	addNavItem, changeActiveFileName,
	changeIsOpenContextMenu,
	changeIsOpenItem, changeNameNavItem, changePositionNavItem, closeAllIsOpenContextMenu,
	deleteNavItem
} from "../../redux/reducers/SectionReducer";
import {NavItemComponent} from "../NavItem/NavItem";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";

export function HeaderComponent(props) {

	const [newPassword, setNewPassword] = useState('');

	const [isChangePassword, setIsChangePassword] = useState(false);

	const menu = (e) => {
		if (!props.isContextMenu && !props.isContextMenuLK ) {
			props.changeIsContextMenu(true);
			props.changeIsContextMenuLK(true);
		}else {
			props.changeIsContextMenu(false);
			props.changeIsContextMenuLK(false);
		}
		// e.preventDefault();
		// e.stopPropagation();
	};

	const changePasswordMode = (e) =>{
		setIsChangePassword(true);
		e.preventDefault();
		e.stopPropagation();
	};

	const updatePassword = () => {
		props.updatePassword(newPassword);
		setNewPassword('');
		setIsChangePassword(false);
	};

	return (
		<div className="header">
			<PanelMoreBtn changePanelShow={props.changePanelShow}/>
			<span className="logo">IT - BooK</span>
			<div className="lk" onClick={menu} onContextMenu={menu}>
				<img src={user} alt={'user'}/>
				{props.isContextMenuLK &&
				<div className='menu'>
					<div className="menuName">{props.name}</div>
					<hr style={{background: 'grey', height: "1px"}}/>
					{!isChangePassword
						? <div className="menuItem" onClick={changePasswordMode}>Change Password</div>
						: <input type="text" placeholder='newPassword' onClick={changePasswordMode} onChange={(e) => setNewPassword(e.currentTarget.value)}
										 value={newPassword}/>
					}
					<hr style={{background: 'grey', height: "1px"}}/>
					{!isChangePassword
						? <div className="menuItem" onClick={props.outLogin}>Out</div>
						: <div className="menuItem menuItemSave" onClick={updatePassword}>Save</div>
					}
				</div>
				}
			</div>
		</div>
	);
}
export const Header = connect(
	(state) => {
		return {
			isContextMenu: state.app.isContextMenu,
			isContextMenuLK: state.app.isContextMenuLK,
			userId: state.app.userId,
			name: state.app.name,
		}
	},
	{
		changeIsContextMenu,
		changeIsContextMenuLK,
		outLogin,
		updatePassword,
		changePanelShow,
	}
)(HeaderComponent);