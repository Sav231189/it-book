import React, {useRef} from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getActiveFile, getFileMain} from "../../selectors/MainSelector";
import {Block} from "../Block/Block";
import {changeIsContextMenu, changeIsContextMenuMain} from "../../redux/reducers/AppReducer";
import {addBlockInActiveFile} from "../../redux/reducers/SectionReducer";

export function MainComponent(props) {
	console.log(props.fileMain)
	console.log(props.activeFile)
	const refContextMenu = useRef(null);

	const showMenuContextNav = (e) => {
		if (!props.isContextMenu && !props.isContextMenuMain ) {
			if (e.target.clientHeight - 26 > e.clientY) {
				refContextMenu.current.style = `top: ${e.clientY - 60}px; left: ${e.clientX +6}px;`;
				props.changeIsContextMenu(true);
				props.changeIsContextMenuMain(true);
			}
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<div className={`Main ${props.showPanel}`} onContextMenu={showMenuContextNav} >
			{props.fileMain.map(el =>
				<Block key={el.id} element={el}/>
			)}
			{/*contextMenu*/}
			<div ref={refContextMenu} className="menuNav" style={props.isContextMenuMain ? {display: 'block'} : {display: 'none'}}>
				<span onClick={(e) => {props.addBlockInActiveFile(props.activeFile,props.userId)}}> + new Block </span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,
		isContextMenuMain: state.app.isContextMenuMain,
		userId: state.app.userId,

		showPanel: state.app.showPanel,
		fileMain: getFileMain(state),
		activeFile: getActiveFile(state),
	}
};
export const Main = connect(mstp, {
	changeIsContextMenu,
	changeIsContextMenuMain,
	addBlockInActiveFile,
})(MainComponent);