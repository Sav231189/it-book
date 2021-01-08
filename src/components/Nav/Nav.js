import React, {useState, useRef, useEffect} from 'react';
import './Nav.css';
import {connect} from "react-redux";
import {addNavItem, getNavItem} from "../../redux/reducers/SectionReducer";
import {changeIsContextMenu, changeIsContextMenuNav} from "../../redux/reducers/AppReducer";
import {getActiveSectionItem} from "../../selectors/NavSelector";
import {NavItem} from "../NavItem/NavItem";

export function NavContainer(props) {
	const refContextMenu = useRef(null);

	const showMenuContextNav = (e) => {
		if (!props.isContextMenu && !props.isContextMenuNav && props.activeSectionItem ) {
			if (e.target.clientHeight - 25 > e.clientY) {
				refContextMenu.current.style = `top: ${e.clientY - 65}px; left: ${e.clientX }px;`;
				props.changeIsContextMenu(true);
				props.changeIsContextMenuNav(true);
			}
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<div className='Nav' onContextMenu={showMenuContextNav}>
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
						<span>{props.activeSectionItem.name}</span>
					</div>
			}
			{props.activeSectionItem &&
			props.activeSectionItem.folderItems.map((el)=> <NavItem key={el.id} element={el} step={0}/> )}

			{/*contextMenu*/}
			<div ref={refContextMenu} className="menuNav" style={props.isContextMenuNav ? {display: 'block'} : {display: 'none'}}>
				<span onClick={() => {props.addNavItem('folder',props.activeSectionItem.id,props.userId)}}> + new Folder </span>
				<span onClick={() => {props.addNavItem('file',props.activeSectionItem.id,props.userId)}}> + new File </span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,
		isContextMenuNav: state.app.isContextMenuNav,
		userId: state.app.userId,
		activeSectionItem: getActiveSectionItem(state.section),
	}
};
export const Nav = connect(mstp, {
	changeIsContextMenu,
	changeIsContextMenuNav,
	addNavItem,
})(NavContainer);