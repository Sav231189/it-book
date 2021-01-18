import React, {useRef, useEffect} from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getActiveFile} from "../../selectors/SectionSelector";
import {Block} from "../Block/Block";
import {changeActiveElement, changeIsContextMenuAC} from "../../redux/reducers/AppReducer";
import {addBlockInActiveFileTHUNK, pastElementTHUNK} from "../../redux/reducers/SectionReducer";
import {
	getActiveElement,
	getIsContextMenu,
	getIsContextMenuMain, getIsShowPanel, getUserId
} from "../../selectors/AppSelector";

export function MainComponent(props) {

	const refContextMenu = useRef(null);

	const showMenuContextNav = (e) => {
		if (!props.isContextMenu && !props.isContextMenuMain && refContextMenu.current && props.activeFile) {
			e.preventDefault();
			e.stopPropagation();
			props.changeIsContextMenuAC('isContextMenu',true);
			props.changeIsContextMenuAC('isContextMenuMain',true);
			if (e.clientY < window.innerHeight - 50) {
				(e.clientX < window.innerWidth - 160)
				?	refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`
				:	refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 162}px;`
			} else {
				(e.clientX < window.innerWidth - 160)
				?	refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX + 2}px;`
				: refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX - 162}px;`
			}
		}
	};
	const activeElement = (e) => {
		if (props.activeFile) {
			props.changeActiveElement(props.activeFile.id);
		}
		// e.stopPropagation()
	};
	return (
		<div className={`Main ${props.isShowPanel}`} onContextMenu={showMenuContextNav}
				 onClick={activeElement}
				 onPaste={e => {
					 console.log('Past Main');
					 props.pastElementTHUNK(e.clipboardData.getData('text/plain'),props.activeElement, props.userId);
					 e.stopPropagation()
				 }}
		>
			{props.activeFile &&
			<div>

				<div className={`mainTitle ${!props.isShowPanel}`}>{props.activeFile.name}</div>

				{props.activeFile.fileMain.length > 0 &&
				<div className={`mainWrapper ${!props.isShowPanel}`}>
					{props.activeFile.fileMain.map(el => <Block key={el.id} element={el}/>)}
				</div>
				}
				{props.activeFile.fileMain.length <= 0 &&
				<div className='noBlockBtn'
						 onClick={(e) => {
							 props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId)
						 }}>
					ADD <br/> BLOCK
				</div>
				}
			</div>
			}
			{/*contextMenu*/}
			<div ref={refContextMenu} className="contextMenu"
					 style={props.isContextMenuMain ? {display: 'block'} : {display: 'none'}}>
				<span onPointerDown={(e) => {
					props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId);

				}}> New Block </span>
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
		activeFile: getActiveFile(state),
		activeElement: getActiveElement(state),
	}), {
		changeIsContextMenuAC,
		addBlockInActiveFileTHUNK,
		changeActiveElement,
		pastElementTHUNK,
	})(MainComponent);