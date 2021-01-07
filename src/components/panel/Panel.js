import React from 'react';
import './Panel.css'
import {Section} from "../section/Section";
import {Nav} from "../Nav/Nav";

export const Panel = (props) => {
	return (
		<div className="panel" style={props.showPanel ? {left: "0"} : {left: `-500px`}}>
			<Section />
			<Nav />
		</div>
	);
}

//<Nav activeSectionItem={props.sectionItems.find((el)=> el.nav.isNavShow)} />