import React from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getFileMain} from "../../selectors/MainSelector";
import {Block} from "../Block/Block";

export function MainComponent(props) {
	return (
		<div className='Main' >
			{props.fileMain.map(el =>
				<Block key={el.id} element={el}/>
			)}
		</div>
	);
}

const mstp = (state) => {
	return {
		fileMain: getFileMain(state),
	}
};
export const Main = connect(mstp, {})(MainComponent);