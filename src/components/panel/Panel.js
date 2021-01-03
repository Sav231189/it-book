import React from 'react';
import './Panel.css'
import {Section} from "../section/Section";
import {connect} from "react-redux";
import {PanelNav} from "../PanelNav/PanelNav";

export const PanelComponent = (props) => {

	return (
		<div className="panel" style={props.show ? {left: "0"} : {left: `-500px`}}>
			<Section />
			<PanelNav activeSectionItem={props.items.find((el)=> el.panelNav.isNavShow)}
			/>
		</div>
	);
}

const mstp = (state) => {
	return {
		show: state.panel.show,
		items: state.section.items,
	}
};
export const Panel = connect(
	mstp,
	{}
)(PanelComponent);