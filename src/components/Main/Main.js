import React, {useRef, useEffect} from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getActiveFile, getFileMain} from "../../selectors/MainSelector";
import {Block} from "../Block/Block";
import {changeIsContextMenu, changeIsContextMenuMain} from "../../redux/reducers/AppReducer";
import {addBlockInActiveFile} from "../../redux/reducers/SectionReducer";

export function MainComponent(props) {

	const refContextMenu = useRef(null);
	const refMainWrapper = useRef(null);

	const resizeMain = () => {
		if (refMainWrapper.current) {
			if (refMainWrapper.current.offsetHeight > window.innerHeight-111){
				refMainWrapper.current.style = "margin-right: 25px;";
			}else {
				refMainWrapper.current.style = "margin-right: 40px;";
			}
		}
	};
	window.addEventListener('resize',resizeMain);
	useEffect(resizeMain);

	const showMenuContextNav = (e) => {
		if (!props.isContextMenu && !props.isContextMenuMain && props.activeFileName !== '') {
			if (e.clientY < window.innerHeight - 50) {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenu(true);
					props.changeIsContextMenuMain(true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 162}px;`;
					props.changeIsContextMenu(true);
					props.changeIsContextMenuMain(true);
				}
			} else {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenu(true);
					props.changeIsContextMenuMain(true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX - 162}px;`;
					props.changeIsContextMenu(true);
					props.changeIsContextMenuMain(true);
				}
			}
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<div className={`Main ${props.showPanel}`} onContextMenu={showMenuContextNav}>
			{props.activeFileName !== "" && props.fileMain.length > 0 &&
			<div className='mainWrapper' ref={refMainWrapper}>
				<div className={`mainTitle ${!props.showPanel}`} >{props.activeFileName}</div>

				{props.fileMain.map(el =>
					<Block key={el.id} element={el}/>
				)}
				{/*contextMenu*/}
				<div ref={refContextMenu} className="menuNav"
						 style={props.isContextMenuMain ? {display: 'block'} : {display: 'none'}}>
					<span onClick={(e) => {
						props.addBlockInActiveFile(props.activeFile, props.userId)
					}}> + new Block </span>
				</div>
			</div>
			}
			{props.fileMain.length <= 0 && props.activeFileName.length > 0 && props.activeFile.type &&
			<div className='noBlockBtn' onClick={(e) => {
				props.addBlockInActiveFile(props.activeFile, props.userId)
			}}>
				ADD <br/> BLOCK
			</div>
			}
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,
		isContextMenuMain: state.app.isContextMenuMain,
		userId: state.app.userId,

		showPanel: state.app.showPanel,
		activeFileName: state.section.activeFileName,
		fileMain: getFileMain(state),
		activeFile: getActiveFile(state),
	}
};
export const Main = connect(mstp, {
	changeIsContextMenu,
	changeIsContextMenuMain,
	addBlockInActiveFile,
})(MainComponent);