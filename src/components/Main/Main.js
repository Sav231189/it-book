import React, {useRef} from 'react';
import './Main.css';
import {connect} from "react-redux";
import {getActiveFile} from "../../selectors/SectionSelector";
import {Block} from "../Block/Block";
import {
	addMessageAC,
	changeActiveElement,
	changeIsContextMenuAC,
	closeAllContextMenuTHUNK
} from "../../redux/reducers/AppReducer";
import {addBlockInActiveFileTHUNK, pastElementTHUNK} from "../../redux/reducers/SectionReducer";
import {
	getActiveElement,
	getIsContextMenu,
	getIsContextMenuMain, getIsShowPanel, getUserId
} from "../../selectors/AppSelector";

export function MainComponent(props) {

	const refContextMenu = useRef(null);

	const showMenuContextNav = (e) => {
		activeElement(e);
		if (!props.isContextMenu && !props.isContextMenuMain && refContextMenu.current && props.activeFile) {
			e.preventDefault();
			e.stopPropagation();
			props.changeIsContextMenuAC('isContextMenu', true);
			props.changeIsContextMenuAC('isContextMenuMain', true);
			if (e.clientY < window.innerHeight - 100) {
				(e.clientX < window.innerWidth - 165)
					? refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 162}px;`
			} else {
				(e.clientX < window.innerWidth - 165)
					? refContextMenu.current.style = `top: ${e.clientY - 67}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY - 67}px; left: ${e.clientX - 162}px;`
			}
		}
	};
	const addBlock = (e) => {
		e.stopPropagation();
		props.closeAllContextMenuTHUNK();
		props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId)
	};

	const activeElement = (e) => {
		props.closeAllContextMenuTHUNK();
		e.stopPropagation();
		props.changeActiveElement(props.activeFile.id, "file");
	};


	const copy = (e) => {
		e.stopPropagation();
		if (navigator.clipboard) {
			navigator.clipboard.writeText(JSON.stringify(props.activeFile)).then(() => {
				props.addMessageAC('success', 'Файл скопирован в буфер обмена.')
			})
		}else {
			let copyTextArea = document.createElement("textarea");
			document.body.append(copyTextArea);
			copyTextArea.innerHTML = JSON.stringify(props.activeFile);
			copyTextArea.select();
			document.execCommand("copy");
			copyTextArea.remove();
			props.addMessageAC('success', 'Файл скопирован в буфер обмена.')
		}
	};

	const paste = (e) => {
		props.closeAllContextMenuTHUNK();
		if (e.pointerType === "mouse") {
			e.stopPropagation();
			if (navigator.clipboard) {
				navigator.clipboard.readText().then(data => {
					props.pastElementTHUNK(data, props.activeFile.id, props.userId);
				});
			} else {
				props.addMessageAC('error', `Нет доступа к буферу обмена. 
				Используйте комбинацию клавиш 
				Ctrl + V`)
			}
		} else if (props.activeElement.type === 'file') {
			e.stopPropagation();
			props.pastElementTHUNK(e.clipboardData.getData('text/plain'), props.activeFile.id, props.userId);
		}
	};

	return (
		<div className={`Main ${props.isShowPanel}`}>
			{props.activeFile &&
			<div>
				<div className={`mainTitle ${!props.isShowPanel}`}>{props.activeFile.name}</div>
				{props.activeFile.fileMain.length > 0 &&
				<div className={`mainWrapper ${!props.isShowPanel} ${props.activeElement.id === props.activeFile.id ? 'active' : ''}`}
							 onContextMenu={showMenuContextNav}
							 onPointerDown={activeElement}
							 onCopy={copy}
							 onPaste={paste}
				>{props.activeFile.fileMain.map(el => <Block key={el.id} element={el}/>)}</div>}
				{props.activeFile.fileMain.length <= 0 &&
				<div className='noBlockBtn' onClick={addBlock}>ADD <br/> BLOCK</div>}
			</div>}
			{/*contextMenu*/}
			<div ref={refContextMenu} className="contextMenu" style={props.isContextMenuMain && props.isContextMenu ? {display: 'block'} : {display: 'none'}}>
				<span onPointerDown={addBlock}> New Block </span>
				<hr/>
				<span onPointerDown={paste}>Past Block</span>
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
		closeAllContextMenuTHUNK,
		changeIsContextMenuAC,
		addBlockInActiveFileTHUNK,
		changeActiveElement,
		pastElementTHUNK,
		addMessageAC,
	})(MainComponent);