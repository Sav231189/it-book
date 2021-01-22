import React, {useRef, useState} from 'react';
import './Block.css';
import {connect} from "react-redux";
import {
	addBlockInActiveFileTHUNK, changeBlockBorderTHUNK, changeBlockTHUNK,
	changeIsOpenContextMenuItemAC, changePositionTHUNK,
	deleteElementTHUNK, pastElementTHUNK
} from "../../redux/reducers/SectionReducer";
import {
	addMessageAC,
	changeActiveElement,
	changeIsContextMenuAC,
	closeAllContextMenuTHUNK
} from "../../redux/reducers/AppReducer";
import {getActiveFile} from "../../selectors/SectionSelector";
import {getActiveElement, getIsContextMenu, getUserId} from "../../selectors/AppSelector";

export function BlockComponent(props) {


	const refContextMenu = useRef(null);

	let [title, setTitle] = useState(props.element.title);
	let [subTitle, setSubTitle] = useState(props.element.subTitle);
	let [text, setText] = useState(props.element.text);

	let [isChangeBlock, setIsChangeBlock] = useState(false);

	function textareaResize(e) {
		e.target.style.height = 20 + "px";
		e.target.style.height = e.target.scrollHeight + 'px';
		if (e.type === 'focus') {
			e.target.setSelectionRange(e.target.innerHTML.length, e.target.innerHTML.length);
		}
	}

	const showBlockContextMenu = (e) => {
		e.preventDefault();
		e.stopPropagation();
		activeElement(e);
		if (!props.isContextMenu && !props.element.isOpenContextMenu && props.activeFile) {
			props.changeIsContextMenuAC('isContextMenu', true);
			props.changeIsOpenContextMenuItemAC(props.element.id, true);
			if (e.clientY < window.innerHeight - 265) {
				(e.clientX < window.innerWidth - 190)
					? refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 188}px;`
			} else {
				(e.clientX < window.innerWidth - 190)
					? refContextMenu.current.style = `top: ${e.clientY - 253}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY - 253}px; left: ${e.clientX - 188}px;`
			}
		}else props.closeAllContextMenuTHUNK();
	};
	const addBlockInActiveFile = (e) => {
		props.addBlockInActiveFileTHUNK(props.activeElement.id, props.userId);
	};
	const changeBlock = (e) => {
			setIsChangeBlock(true);
	};
	const saveChangeInBlock = (e) => {
		setIsChangeBlock(false);
		props.changeBlockTHUNK(props.element.id, title, subTitle, text, props.userId);
	};
	const changeBorderInBlock = (e) => {
		props.changeBlockBorderTHUNK(props.element.id, props.userId);
	};
	const changePosition = (e) => {
		e.stopPropagation();
		e.preventDefault();
		e.target.innerHTML === 'Position UP' ?
			props.changePositionTHUNK(props.element.id, "up", props.userId) :
			props.changePositionTHUNK(props.element.id, "down", props.userId)
	};
	const deleteBlock = (e) => {
		props.closeAllContextMenuTHUNK();
		if (window.confirm('Вы хотите удалить блок?')) {
			props.deleteElementTHUNK(props.element.id, 'element', props.userId);
		}
	};

	const activeElement = (e) => {
		props.closeAllContextMenuTHUNK();
		e.stopPropagation();
		if (window.getSelection().isCollapsed) {
			props.changeActiveElement(props.element.id, "block");
		}
	};

	const copy = (e) => {
		props.closeAllContextMenuTHUNK();
		if(props.activeElement.type === 'block'){
			e.stopPropagation();
			if (window.getSelection().isCollapsed && !isChangeBlock) {
				if (navigator.clipboard) {
					navigator.clipboard.writeText(JSON.stringify(props.element)).then(() => {
						props.addMessageAC('success', 'Блок скопирован в буфер обмена.');
					})
				}else {
					let copyTextArea = document.createElement("textarea");
					document.body.append(copyTextArea);
					copyTextArea.innerHTML = JSON.stringify(props.element);
					copyTextArea.select();
					document.execCommand("copy");
					copyTextArea.remove();
					props.addMessageAC('success', 'Блок скопирован в буфер обмена.');
				}
			}
		}
	};

	const paste = (e) => {
		props.closeAllContextMenuTHUNK();
		if (e.pointerType === "mouse") {
			if (navigator.clipboard) {
				navigator.clipboard.readText().then(data => {
					if (!isChangeBlock) {
						props.pastElementTHUNK(data, props.activeElement.id, props.userId);
					} else if (data) {
						pastText(data);
					}
				});
			} else {
				props.addMessageAC('error', `Нет доступа к буферу обмена. 
				Используйте комбинацию клавиш 
				Ctrl + V`)
			}
		} else if (props.activeElement.type === 'block' && !isChangeBlock) {
			e.stopPropagation();
			props.pastElementTHUNK(e.clipboardData.getData('text/plain'), props.activeElement.id, props.userId);
		}

	};
	const pastText = (text) => {
		let e = document.getSelection();
		let element = e.focusNode[0];
		if (element) {
			let {selectionStart, selectionEnd} = element;
			switch (element.className) {
				case "inputTitle":
					element.setRangeText(text, selectionStart, selectionEnd, 'end');
					setTitle(`${element.value}`);
					break;
				case "inputSubTitle":
					element.setRangeText(text, selectionStart, selectionEnd, 'end');
					setSubTitle(`${element.value}`);
					break;
				case "inputText":
					element.setRangeText(text, selectionStart, selectionEnd, 'end');
					setText(`${element.value}`);
					break;
			}
			let myEvent = new Event("keyup", {bubbles: true, cancelable: true, composed: true});
			element.dispatchEvent(myEvent);
		}
	};

	return (
		<div
			className={`Block ${!props.element.isBorder} ${props.activeElement.id === props.element.id && 'active'}`}
			onContextMenu={showBlockContextMenu}
			onDoubleClick={() => setIsChangeBlock(true)}
			onPointerDown={activeElement}
			onCopy={copy}
			onPaste={paste}
		>
			{/* Title */}
			{title !== '' && !isChangeBlock && <div className='blockTitle'>{title}</div>}
			{isChangeBlock && <div className='blockGeneral'>
				<form action="#">
					<textarea className='inputTitle' autoFocus placeholder='Title'
										value={title}
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setTitle(e.target.value);
											textareaResize(e);
										}}/>
				</form>
			</div>}
			{/* SubTitle */}
			{subTitle !== '' && !isChangeBlock && <div className='blockSubTitle'>{subTitle}</div>}
			{isChangeBlock && <div className='blockGeneral'>
				<form action="#">
					<textarea className='inputSubTitle' autoFocus placeholder='SubTitle'
										value={subTitle}
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setSubTitle(e.target.value);
											textareaResize(e);
										}}/>
				</form>
			</div>}
			{/* Text */}
			{text !== '' && !isChangeBlock && <div className='blockText'>{text}</div>}
			{isChangeBlock &&	<div className='blockGeneral'>
				<form action="#">
					<textarea className='inputText' value={text} autoFocus placeholder='Text'
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setText(e.target.value);
											textareaResize(e);
										}}/>
				</form>
			</div>}
			{isChangeBlock &&	<button className='saveNameBtn' onPointerDown={saveChangeInBlock}>SAVE</button>}

			{props.element.fileMain &&	props.element.fileMain
			.map(el => <Block key={el.id} element={el}/>)}

			{/* contextMenu */}
			<div ref={refContextMenu} className="contextMenu blockContextMenu" style={props.element.isOpenContextMenu && props.isContextMenu ? {display: 'block'} : {display: 'none'}}>
				<span onPointerDown={addBlockInActiveFile}>New Block</span>
				<hr/>
				<span onPointerDown={changeBlock}>Change Block</span>
				<hr/>
				<span onPointerDown={changeBorderInBlock}>{props.element.isBorder ? `Clear Border` : `Show Border`}</span>
				<hr/>
				<span onPointerDown={()=>document.execCommand("copy")}>{`Copy ${window.getSelection().isCollapsed && !isChangeBlock ? 'Block' : ''}`}</span>
				<span onPointerDown={paste}>{`Paste ${window.getSelection().isCollapsed && !isChangeBlock ? 'Block' : ''}`}</span>
				<hr/>
				<span onPointerDown={changePosition}
							onContextMenu={e => {e.preventDefault(); props.closeAllContextMenuTHUNK()}}
							onDoubleClick={e => {e.preventDefault(); e.stopPropagation()}}
				>Position UP</span>
				<span onPointerDown={changePosition}
							onContextMenu={e => {e.preventDefault(); props.closeAllContextMenuTHUNK()}}
							onDoubleClick={e => {e.preventDefault(); e.stopPropagation()}}
				>Position DOWN</span>
				<hr/>
				<span onPointerDown={deleteBlock}>Delete Block</span>
			</div>
		</div>
	);
}

export const Block = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		userId: getUserId(state),
		activeFile: getActiveFile(state),
		activeElement: getActiveElement(state),
	}), {
		closeAllContextMenuTHUNK,
		changeIsContextMenuAC,
		changeIsOpenContextMenuItemAC,
		addBlockInActiveFileTHUNK,
		changeBlockTHUNK,
		changeBlockBorderTHUNK,
		changePositionTHUNK,
		deleteElementTHUNK,
		changeActiveElement,
		pastElementTHUNK,
		addMessageAC,
	})
(BlockComponent);