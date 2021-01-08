import React from 'react';
import './Panel.css'
import {Section} from "../section/Section";
import {Nav} from "../Nav/Nav";

export const Panel = (props) => {

	return (
		<div className={`panel ${!props.showPanel}`}>
			<Section />
			<Nav />
		</div>
	);
}
