import React from 'react';
import './PanelNav.css';
import {NavItems} from "../NavItems/NavItems";
import {connect} from "react-redux";
import {addPanelNavItem} from "../../redux/reducers/SectionReducer";

export function PanelNavContainer(props) {
	const showMenuNavItems = (e) => {
		if (!props.isOpenContextMenu) {
			if (e.target.clientHeight + 20 > e.clientY) {
				e.target.lastChild.style = `top: ${e.clientY - 75}px; left: ${e.clientX - 75}px;`;
				props.menuPanelNavShow();
				props.changeIsOpenMenu(true);
			}
		} else {
			props.closeOpenMenu();
			props.changeIsOpenMenu(false);
		}
	};
	const addItemInPanelNav = (item) => {
		props.addPanelNavItem(item);
	};

	return (
		<div className='panelNav' onContextMenu={showMenuNavItems}>
			{
				!props.activeSectionItem
					?
					<div className='previewNav'
							 onContextMenu={(e) => {
								 e.stopPropagation();
								 e.preventDefault()
							 }}>
						<span>"PREVIEW"</span>
					</div>
					:
					<div className='panelNavTitle'>
						{props.activeSectionItem.panelNav.parentName}
					</div>
			}
			{props.activeSectionItem &&
			<NavItems step={0} navItems={props.activeSectionItem.panelNav.navItems}/>}

			{/*contextMenu*/}
			<div className="menuPanelNav" style={props.isMenuNavItems ? {display: 'block'} : {display: 'none'}}>
				<span onClick={() => {
					addItemInPanelNav('folder')
				}}> + new Folder </span>
				<span onClick={() => {
					addItemInPanelNav('file')
				}}> + new File </span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isMenuNavItems: state.section.isMenuNavItems,
		isOpenContextMenu: state.app.isOpenContextMenu,
	}
};
export const PanelNav = connect(mstp, {
	addPanelNavItem,
})(PanelNavContainer);