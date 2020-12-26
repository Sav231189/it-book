import React from 'react';
import './Panel.css'
import {Section} from "../section/Section";
import {connect} from "react-redux";

export const PanelComponent = (props) => {

	return (
		<div className="panel" style={props.show ? {left: "0"} : {left: `-500px`}}>
			<Section/>
			<div className="panelNav">
				panelNav
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