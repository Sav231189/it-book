import React,{useRef,useEffect} from 'react';
import './Section.css'
import {connect} from "react-redux";
import {SectionItem} from "../sectionItem/SectionItem";
import {
	changeIsContextMenu, changeIsContextMenuSection,
} from "../../redux/reducers/AppReducer";
import {addSectionItem, getData} from "../../redux/reducers/SectionReducer";

export function SectionComponent(props) {

	useEffect(()=>{
		props.getData(props.userId);
	},[props.userId]);

	const refContextMenu = useRef(null);

	const showMenuContextSection = (e) => {
		if (!props.isContextMenu && !props.isContextMenuSection) {
			if (e.target.clientHeight - 25 > e.clientY) {
				refContextMenu.current.style = `top: ${e.clientY - 60}px; left: ${e.clientX}px;`;
				props.changeIsContextMenu(true);
				props.changeIsContextMenuSection(true);
			}
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<div className="section" onContextMenu={showMenuContextSection}>
			{props.sectionItems.map((el) => <SectionItem key={el.id} element={el}/>)}
			<div ref={refContextMenu} className="menuSection" style={props.isContextMenuSection ? {display: 'block'} : {display: 'none'}}>
				<span onClick={(e)=>props.addSectionItem(props.userId)}>Добавить +</span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,
		isContextMenuSection: state.app.isContextMenuSection,

		sectionItems: state.section.sectionItems,
		userId: state.app.userId,
	}
};
let changeContextMenuItem;
export const Section = connect(mstp, {
	changeIsContextMenu,
	changeIsContextMenuSection,

	addSectionItem,
	getData,
})(SectionComponent);

