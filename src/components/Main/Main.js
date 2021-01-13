import React, {useRef, useEffect} from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getActiveFile, getFileMain} from "../../selectors/SectionSelector";
import {Block} from "../Block/Block";
import {changeIsContextMenuAC, changeIsContextMenuMainAC} from "../../redux/reducers/AppReducer";
import {addBlockInActiveFileTHUNK} from "../../redux/reducers/SectionReducer";
import {getActiveFileName, getIsContextMenu,
	getIsContextMenuMain, getIsShowPanel, getUserId
} from "../../selectors/AppSelector";

export function MainComponent(props) {

	const refContextMenu = useRef(null);

	const showMenuContextNav = (e) => {
		if (!props.isContextMenu && !props.isContextMenuMain && refContextMenu.current && props.activeFileName !== '') {
			e.preventDefault();
			e.stopPropagation();
			if (e.clientY < window.innerHeight - 50) {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenuAC(true);
					props.changeIsContextMenuMainAC(true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 162}px;`;
					props.changeIsContextMenuAC(true);
					props.changeIsContextMenuMainAC(true);
				}
			} else {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenuAC(true);
					props.changeIsContextMenuMainAC(true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX - 162}px;`;
					props.changeIsContextMenuAC(true);
					props.changeIsContextMenuMainAC(true);
				}
			}
		}
	};

	return (
		<div className={`Main ${props.isShowPanel}`} onContextMenu={showMenuContextNav}>
			{props.activeFileName !== '' &&
			<div className={`mainTitle ${!props.isShowPanel}`}>{props.activeFileName}</div>
			}
			{props.activeFileName !== "" && props.fileMain.length > 0 &&
			<div className={`mainWrapper ${!props.isShowPanel}`}>
				{props.fileMain.map(el => <Block key={el.id} element={el}/>)}
			</div>
			}
			{props.fileMain.length <= 0 && props.activeFileName.length > 0 &&	props.activeFile.type &&
			<div className='noBlockBtn'
					 onClick={(e) => {props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId)}}>
				ADD <br/> BLOCK
			</div>
			}
			{/*contextMenu*/}
			<div ref={refContextMenu} className="contextMenu"
					 style={props.isContextMenuMain ? {display: 'block'} : {display: 'none'}}>
					<span onClick={(e) => {props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId)}}> New Block </span>
			</div>
		</div>
	);
}

export const Main = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		isContextMenuMain: getIsContextMenuMain(state),
		userId: getUserId(state),
		isShowPanel: getIsShowPanel(state),
		activeFileName: getActiveFileName(state),
		fileMain: getFileMain(state),
		activeFile: getActiveFile(state),
	}), {
		changeIsContextMenuAC,
		changeIsContextMenuMainAC,
		addBlockInActiveFileTHUNK,
	})(MainComponent);