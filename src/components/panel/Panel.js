import React from 'react';
import './Panel.css'
import {Section} from "../section/Section";
import {connect} from "react-redux";

export function PanelComponent(props) {

	const menuHover = (e) => {
		e.relatedTarget.classList.add('hover');
	};
	const menuHoverOut = (e) => {
		e.relatedTarget.classList.remove('hover');
	};
	const addSection = (e) => {
		e.target.parentElement.classList.remove('hover');
	};

	return (
		<div className="panel" style={props.show ? {left: "0"} : {left: `-500px`}}>
			<Section/>
			<div className="panelNav">

			</div>
			<div className="menu">
				<span onPointerOver={menuHover}  onPointerOut={menuHoverOut} onClick={addSection}>Добавить +</span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		show: state.panel.show,
	}
};
export const Panel = connect(
	mstp,
	{}
)(PanelComponent);