import React from 'react';
import './PanelNav.css';
import {NavItems} from "../NavItems/NavItems";
import {connect} from "react-redux";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";
import {addPanelNavItem, menuPanelNavShow} from "../../redux/reducers/SectionReducer";

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
			{ !props.itemsElement && <div
				onContextMenu={(e)=>{e.stopPropagation();e.preventDefault()}}
				className='previewNav'><span>"PREVIEW"</span></div>}
			{ props.itemsElement &&
			<div className='panelNavTitle'>
					{props.itemsElement.panelNav.parentName}
				</div>
			}
			{ props.itemsElement &&
			<NavItems navItems={props.itemsElement.panelNav.navItems} step={0}/>}
			<div className="menuPanelNav" style={props.isMenuNamItems ? {display: 'block'} : {display: 'none'}}>
				<span onClick={()=>{addItemInPanelNav('folder')}}> + new Folder </span>
				<span onClick={()=>{addItemInPanelNav('file')}}> + new File </span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isMenuNamItems: state.section.isMenuNavItems,
		isOpenMenu: state.app.isOpenMenu,
	}
};
export const PanelNav = connect(mstp,{
	changeIsOpenMenu,
	closeOpenMenu,
	menuPanelNavShow,
	addPanelNavItem,
	})(PanelNavContainer);