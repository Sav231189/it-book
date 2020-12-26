import React from 'react';
import './Section.css'
import {connect} from "react-redux";
import {SectionItem} from "../sectionItem/SectionItem";
import {menuSectionItemShow, menuSectionShow} from "../../redux/reducers/SectionReducer";
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

	const addSectionItem = () => {

	};

	return (
		<div className="section" onContextMenu={showMenuSection}>
			{/*вывод элементов section*/}
			{props.items.map((el) => <SectionItem
				key={el.position} url={el.url} name={el.name} isMenuSectionItem={el.isMenuSectionItem} position={el.position}
				isOpenMenu={props.isOpenMenu}
				changeIsOpenMenu={props.changeIsOpenMenu}
				menuSectionItemShow={props.menuSectionItemShow}
			/>)}
			{/*context menu section*/}
			<div className="menuSection" style={props.isMenuSection ? {display: 'block'} : {display: 'none'}}>
				<span onClick={addSectionItem}>Добавить +</span>
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
	}
)(SectionComponent);
