import React from 'react';
import './PanelMoreBtn.css'

export function PanelMoreBtn(props) {

	return (
		<div className="panelMore" onClick={props.changePanelShow}>
			<div> </div>
			<div> </div>
			<div> </div>
		</div>
	);
}
