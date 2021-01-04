import React from 'react';
import './Section.css'
import {connect} from "react-redux";
import {SectionItem} from "../sectionItem/SectionItem";
import {
	activateSectionItem,
	addSectionItem, changePositionSectionItem, changeSectionItem,
	deleteSectionItem,
	menuSectionItemShow,
	menuSectionShow, showChangeSectionItem, unShowChangeSectionItem
} from "../../redux/reducers/SectionReducer";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";

export function SectionComponent(props) {
	// console.log("render Section")
	const showMenuSection = (e) => {
		if (!props.isOpenMenu) {
			if (e.target.clientHeight - 25 > e.clientY) {
				e.target.lastChild.style = `top: ${e.clientY - 60}px; left: ${e.clientX}px;`;
				props.menuSectionShow();
				props.changeIsOpenMenu(true);
			}
		}else {
			props.closeOpenMenu()
			props.changeIsOpenMenu(false);
		}
	};


	return (
		<div className="section" onContextMenu={showMenuSection}>
			{/*вывод элементов section*/}
			{props.items.map((el,index) => <SectionItem
				key={el.id}
				url={el.url}
				name={el.name}
				isMenuSectionItem={el.isMenuSectionItem}
				isActive={el.isActive}
				id={el.id}
				position={index}
				length={props.items.length}
				isChangeSectionItem={el.isChangeSectionItem}
				showChangeSectionItem={props.showChangeSectionItem}
				unShowChangeSectionItem={props.unShowChangeSectionItem}
				isOpenMenu={props.isOpenMenu}
				changeIsOpenMenu={props.changeIsOpenMenu}
				menuSectionItemShow={props.menuSectionItemShow}
				deleteSectionItem={props.deleteSectionItem}
				activateSectionItem={props.activateSectionItem}
				changeSectionItem={props.changeSectionItem}
				changePositionSectionItem={props.changePositionSectionItem}
			/>)}
			{/*context menu section*/}
			<div className="menuSection" style={props.isMenuSection ? {display: 'block'} : {display: 'none'}}>
				<span onClick={props.addSectionItem}>Добавить +</span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		items: state.section.items,
		isMenuSection: state.section.isMenuSection,
		isOpenMenu: state.app.isOpenMenu,
	}
};
export const Section = connect(
	mstp,
	{
		menuSectionShow,
		menuSectionItemShow,
		changeIsOpenMenu,
		closeOpenMenu,
		addSectionItem,
		deleteSectionItem,
		showChangeSectionItem,
		unShowChangeSectionItem,
		activateSectionItem,
		changeSectionItem,
		changePositionSectionItem,
	}
)(SectionComponent);
