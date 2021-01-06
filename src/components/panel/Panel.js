import React from 'react';
import './Panel.css'
import {Section} from "../section/Section";
import {PanelNav} from "../PanelNav/PanelNav";

export const Panel = (props) => {
	return (
		<div className="panel" style={props.showPanel ? {left: "0"} : {left: `-500px`}}>
			<Section />
			{/*<PanelNav activeSectionItem={props.items.find((el)=> el.panelNav.isNavShow)}/>*/}
		</div>
	);
}
