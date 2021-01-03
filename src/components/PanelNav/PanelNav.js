import React from 'react';
import './PanelNav.css';
import {NavItems} from "../NavItems/NavItems";
import {connect} from "react-redux";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";
import {
	addFileNavItem,
	addFolderNavItem,
	addPanelNavItem,
	changeIsOpenContextMenu,
	changeNameNavItem, changePositionNavItem,
	closeAllIsOpenContextMenu,
	deleteNavItem,
	menuNavItemShow,
	menuPanelNavShow,
	openCloseFolder,
	openFile
} from "../../redux/reducers/SectionReducer";


export function PanelNavContainer(props) {
	const showMenuNavItems = (e) => {
		if (!props.isOpenMenu) {
			if (e.target.clientHeight +20 > e.clientY) {
				e.target.lastChild.style = `top: ${e.clientY - 75}px; left: ${e.clientX - 75}px;`;
				props.menuPanelNavShow();
				props.changeIsOpenMenu(true);
			}
		}else {
			props.closeOpenMenu();
			props.changeIsOpenMenu(false);
		}
	};
	const addItemInPanelNav = (item) => {
		props.addPanelNavItem(item);
	};

	return (
		<div className='panelNav' onContextMenu={showMenuNavItems}>
			{!props.activeSectionItem
				? <div
					onContextMenu={(e) => {
						e.stopPropagation();
						e.preventDefault()
					}}
					className='previewNav'><span>"PREVIEW"</span></div>
				: <div className='panelNavTitle'>
					{props.activeSectionItem.panelNav.parentName}
				</div>
			}
			{ props.activeSectionItem &&
			<NavItems navItems={props.activeSectionItem.panelNav.navItems}
								openCloseFolder={props.openCloseFolder}
								step={0}
								openFile={props.openFile}
								isOpenMenu={props.isOpenMenu}
								changeIsOpenMenu={props.changeIsOpenMenu}
								isMenuNavItem={props.isMenuNavItem}
								menuNavItemShow={props.menuNavItemShow}
								closeOpenMenu={props.closeOpenMenu}
								changeIsOpenContextMenu={props.changeIsOpenContextMenu}
								closeAllIsOpenContextMenu={props.closeAllIsOpenContextMenu}
								addFolderNavItem={props.addFolderNavItem}
								addFileNavItem={props.addFileNavItem}
								deleteNavItem={props.deleteNavItem}
								changeNameNavItem={props.changeNameNavItem}
								changePositionNavItem={props.changePositionNavItem}
			/>}
			<div className="menuPanelNav" style={props.isMenuNavItems ? {display: 'block'} : {display: 'none'}}>
				<span onClick={()=>{addItemInPanelNav('folder')}}> + new Folder </span>
				<span onClick={()=>{addItemInPanelNav('file')}}> + new File </span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isMenuNavItems: state.section.isMenuNavItems,
		isMenuNavItem: state.section.isMenuNavItem,
		isOpenMenu: state.app.isOpenMenu,
	}
};
export const PanelNav = connect(mstp,{
	changeIsOpenMenu,
	closeOpenMenu,
	menuPanelNavShow,
	menuNavItemShow,
	addPanelNavItem,
	openCloseFolder,
	openFile,
	changeIsOpenContextMenu,
	closeAllIsOpenContextMenu,
	addFolderNavItem,
	addFileNavItem,
	deleteNavItem,
	changeNameNavItem,
	changePositionNavItem,
	})(PanelNavContainer);