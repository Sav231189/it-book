import React from 'react';
import './NavItems.css'
import {NavItem} from "../NavItem/NavItem";

export function NavItems(props) {
	// console.log("render NavItem")

	return (
		<div className='navItems'>
			{props.navItems.map((el,index) => {
				return <NavItem key={el.id}
												openCloseFolder={props.openCloseFolder}
												openFile={props.openFile}
												element={el}
												step={props.step}
												changeIsOpenMenu={props.changeIsOpenMenu}
												isMenuNavItem={props.isMenuNavItem}
												menuNavItemShow={props.menuNavItemShow}
												isOpenMenu={props.isOpenMenu}
												closeOpenMenu={props.closeOpenMenu}
												changeIsOpenContextMenu={props.changeIsOpenContextMenu}
												closeAllIsOpenContextMenu={props.closeAllIsOpenContextMenu}
												addFolderNavItem={props.addFolderNavItem}
												addFileNavItem={props.addFileNavItem}
												deleteNavItem={props.deleteNavItem}
												changeNameNavItem={props.changeNameNavItem}
												changePositionNavItem={props.changePositionNavItem}
				/>
				})
			}
		</div>
	);
}
