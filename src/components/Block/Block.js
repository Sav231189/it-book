import React, {useRef, useState} from 'react';
import './Block.css';
import {connect} from "react-redux";
import {
	addBlockInActiveFileTHUNK, changeBlockTHUNK,
	changeIsOpenContextMenuItemAC, changePositionTHUNK,
	deleteElementTHUNK, pastElementTHUNK
} from "../../redux/reducers/SectionReducer";
import {changeActiveElement, changeIsContextMenuAC} from "../../redux/reducers/AppReducer";
import {getActiveFile} from "../../selectors/SectionSelector";
import {getActiveElement, getIsContextMenu, getUserId} from "../../selectors/AppSelector";

export function BlockComponent(props) {

	const refContextMenu = useRef(null);

	let [title, setTitle] = useState(props.element.title);
	let [subTitle, setSubTitle] = useState(props.element.subTitle);
	let [text, setText] = useState(props.element.text);

	let [isChangeBlock, setIsChangeBlock] = useState(false);

	const showBlockContextMenu = (e) => {

		if (!props.isContextMenu && !props.element.isOpenContextMenu && props.activeFile) {
			e.preventDefault();
			e.stopPropagation();
			activeElement();
			props.changeIsContextMenuAC('isContextMenu', true);
			props.changeIsOpenContextMenuItemAC(props.element.id, true);
			if (e.clientY < window.innerHeight - 240) {
				(e.clientX < window.innerWidth - 180)
					? refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 188}px;`
			} else {
				(e.clientX < window.innerWidth - 180)
					? refContextMenu.current.style = `top: ${e.clientY - 246}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY - 248}px; left: ${e.clientX - 188}px;`
			}
		}
	};
	const addBlockInActiveFile = () => {
		props.addBlockInActiveFileTHUNK(props.activeFile.id, props.userId);
	};

	const changeBorderInBlock = () => {
		props.changeBlockTHUNK(props.element.id, 'changeBorder', '', props.userId);
	};
	const changePosition = (e) => {
		e.stopPropagation()
		e.target.innerHTML === 'Position UP' ?
			props.changePositionTHUNK(props.element.id, "up", props.userId) :
			props.changePositionTHUNK(props.element.id, "down", props.userId)
	};
	const deleteBlock = () => {
		if (window.confirm('Вы хотите удалить блок?')) {
			props.deleteElementTHUNK(props.element.id, 'element', props.userId);
		}
	};

	function textareaResize(e) {
		e.target.style.height = 20 + "px";
		e.target.style.height = e.target.scrollHeight + 'px';
		if (e.type === 'focus') {
			e.target.setSelectionRange(e.target.innerHTML.length, e.target.innerHTML.length);
		}
	}

	function changeInBlock(e) {
		setIsChangeBlock(false);
		props.changeBlockTHUNK(props.element.id, 'changeTitle', title, props.userId);
		props.changeBlockTHUNK(props.element.id, 'changeSubTitle', subTitle, props.userId);
		props.changeBlockTHUNK(props.element.id, 'changeText', text, props.userId);
	}

	const activeElement = (e) => {
		if (window.getSelection().isCollapsed && !isChangeBlock) {
			props.changeActiveElement(props.element.id);
		}
	};

	return (
		<div
			className={`Block ${!props.element.isBorder} ${props.activeElement === props.element.id && !isChangeBlock && 'active'}`}
			onContextMenu={showBlockContextMenu}
			onDoubleClick={(e) => setIsChangeBlock(true)}
			onClick={e => {
				activeElement()
				e.stopPropagation();
			}}
			onCopy={e => {
				console.log('copy BlocK');
				if (window.getSelection().isCollapsed && !isChangeBlock) {
					e.clipboardData.setData('text/plain', JSON.stringify(props.element));
					e.preventDefault();
				}
			}}
			onPaste={e => {
				console.log('Past in Block');
				props.pastElementTHUNK(e.clipboardData.getData('text/plain'), props.activeElement, props.userId);
				e.stopPropagation()
			}}
			// onClick={activeElement}
		>
			{title !== '' && !isChangeBlock &&
			<div className='blockTitle'>
				{title}</div>
			}
			{isChangeBlock &&
			<div className='blockGeneral'>
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
			</div>
			}

			{subTitle !== '' && !isChangeBlock &&
			<div className='blockSubTitle'>
				{subTitle}</div>
			}

			{isChangeBlock &&
			<div className='blockGeneral'>
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
			</div>
			}

			{text !== '' && !isChangeBlock &&
			<div className='blockText'>
				{text}</div>
			}
			{isChangeBlock &&
			<div className='blockGeneral'>
				<form action="#">
					<textarea className='inputText' value={text} autoFocus placeholder='Text'
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setText(e.target.value);
											textareaResize(e);
										}}/>
				</form>
			</div>
			}
			{isChangeBlock &&
			<button className='saveNameBtn' onClick={changeInBlock}>SAVE</button>
			}

			{props.element.fileMain &&
			props.element.fileMain.map(el =>
				<Block key={el.id} element={el}/>)
			}

			{/* contextMenu */}
			<div ref={refContextMenu} className="contextMenu blockContextMenu"
					 style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				<span onPointerDown={addBlockInActiveFile}>New Block</span>
				<hr/>
				<span onPointerDown={() => {
					setIsChangeBlock(true);
				}}>Change Block</span>
				<hr/>
				<span onPointerDown={changeBorderInBlock}>{props.element.isBorder ? `Clear Border` : `Show Border`}</span>
				<hr/>
				<span onPointerDown={changePosition}
							onDoubleClick={e => {
								e.stopPropagation()
							}}
				>Position UP</span>
				<span onPointerDown={changePosition}
							onDoubleClick={e => {
								e.stopPropagation()
							}}
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
		changeIsContextMenuAC,
		changeIsOpenContextMenuItemAC,
		addBlockInActiveFileTHUNK,
		changeBlockTHUNK,
		changePositionTHUNK,
		deleteElementTHUNK,
		changeActiveElement,
		pastElementTHUNK,
	})
(BlockComponent);