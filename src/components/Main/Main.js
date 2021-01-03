import React from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getFileMain} from "../../selectors/MainSelector";
import {Block} from "../Block/Block";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";
import {changeIsOpenContextMenu, closeAllIsOpenContextMenu} from "../../redux/reducers/SectionReducer";

export function MainComponent(props) {
	return (
		<div className='Main' >
			{props.fileMain.map(el =>
				<Block key={el.id} element={el}
							 isOpenMenu={props.isOpenMenu}

							 changeIsOpenMenu={props.changeIsOpenMenu}
							 closeAllIsOpenContextMenu={props.closeAllIsOpenContextMenu}
							 changeIsOpenContextMenu={props.changeIsOpenContextMenu}
							 closeOpenMenu={props.closeOpenMenu}
				/>
			)}
		</div>
	);
}

const mstp = (state) => {
	return {
		fileMain: getFileMain(state),
		isOpenMenu: state.app.isOpenMenu,
	}
};
export const Main = connect(mstp, {
	changeIsOpenMenu,

	closeAllIsOpenContextMenu,
	changeIsOpenContextMenu,
	closeOpenMenu,
})
(MainComponent);