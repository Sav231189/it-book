import React from 'react';
import panelMore from "../../img/more.svg";
import './PanelMoreBtn.css'
import {connect} from "react-redux";
import {panelShowChange} from "../../redux/reducers/PanelReducer";

export function PanelMoreBtn(props) {

	return (
		<div className="panelMore" onClick={props.changePanelShow}>
			<img src={panelMore} alt="panelMore"/>
		</div>
	);
}
