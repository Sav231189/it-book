import React from 'react';
import panelMore from "../../img/more.svg";
import './PanelMoreBtn.css'
import {connect} from "react-redux";
import {panelShowChange} from "../../redux/reducers/PanelReducer";

function PanelMoreBtnComponent(props) {
	return (
		<div className="panelMore" onClick={props.panelShowChange}>
			<img src={panelMore} alt="panelMore"/>
		</div>
	);
}
const mstp = (state) => {
	return {

	}
};
export const PanelMoreBtn = connect(
	mstp,
	{
		panelShowChange,
	}
)(PanelMoreBtnComponent);
