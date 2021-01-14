import React, {useRef, useEffect} from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getActiveFile} from "../../selectors/SectionSelector";
import {Block} from "../Block/Block";
import {changeIsContextMenuAC} from "../../redux/reducers/AppReducer";
import {addBlockInActiveFileTHUNK} from "../../redux/reducers/SectionReducer";
import {
	getIsContextMenu,
	getIsContextMenuMain, getIsShowPanel, getUserId
} from "../../selectors/AppSelector";

export function MainComponent(props) {

	const refContextMenu = useRef(null);

	const showMenuContextNav = (e) => {
		if (!props.isContextMenu && !props.isContextMenuMain && refContextMenu.current && props.activeFile) {
			e.preventDefault();
			e.stopPropagation();
			if (e.clientY < window.innerHeight - 50) {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenuAC('isContextMenu',true);
					props.changeIsContextMenuAC('isContextMenuMain',true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 162}px;`;
					props.changeIsContextMenuAC('isContextMenu',true);
					props.changeIsContextMenuAC('isContextMenuMain',true);
				}
			} else {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenuAC('isContextMenu',true);
					props.changeIsContextMenuAC('isContextMenuMain',true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX - 162}px;`;
					props.changeIsContextMenuAC('isContextMenu',true);
					props.changeIsContextMenuAC('isContextMenuMain',true);
				}
			}
		}
	};

	return (
		<div className={`Main ${props.isShowPanel}`} onContextMenu={showMenuContextNav}>
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
				<span onClick={(e) => {
					props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId)
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
	}), {
		changeIsContextMenuAC,
		addBlockInActiveFileTHUNK,
	})(MainComponent);