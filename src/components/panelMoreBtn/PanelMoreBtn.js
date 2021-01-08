import React from 'react';
import panelMore from "../../img/more.svg";
import './PanelMoreBtn.css'

export function PanelMoreBtn(props) {

	return (
		<div className="panelMore" onClick={props.changePanelShow}>
			<img src={panelMore} alt="panelMore"/>
		</div>
	);
}
