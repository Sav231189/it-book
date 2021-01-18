import React, {useRef, useState} from 'react';
import './Block.css';
import {connect} from "react-redux";
import {
	addBlockInActiveFileTHUNK, changeBlockTHUNK,
	changeIsOpenContextMenuItemAC, changePositionTHUNK,
	deleteElementTHUNK
} from "../../redux/reducers/SectionReducer";
import {changeActiveElement, changeIsContextMenuAC} from "../../redux/reducers/AppReducer";
import {getActiveFile} from "../../selectors/SectionSelector";
import {getActiveElement, getIsContextMenu, getUserId} from "../../selectors/AppSelector";

export function BlockComponent(props) {

	const refContextMenu = useRef(null);

	let [title, setTitle] = useState(props.element.title);
	let [subTitle, setSubTitle] = useState(props.element.subTitle);
	let [text, setText] = useState(props.element.text);

	let [isChangeTitle, setIsChangeTitle] = useState(false);
	let [isChangeSubTitle, setIsChangeSubTitle] = useState(false);
	let [isChangeText, setIsChangeText] = useState(false);

	const showBlockContextMenu = (e) => {
		if (!props.isContextMenu && !props.element.isOpenContextMenu && props.activeFile) {
			e.preventDefault();
			e.stopPropagation();
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
	const changeTitleInBlock = () => {
		setIsChangeTitle(false);
		props.changeBlockTHUNK(props.element.id, 'changeTitle', title, props.userId);

	};
	const changeSubTitleInBlock = () => {
		setIsChangeSubTitle(false);
		props.changeBlockTHUNK(props.element.id, 'changeSubTitle', subTitle, props.userId);
	};
	const changeTextInBlock = () => {
		setIsChangeText(false);
		props.changeBlockTHUNK(props.element.id, 'changeText', text, props.userId);
	};
	const changeBorderInBlock = () => {
		props.changeBlockTHUNK(props.element.id, 'changeBorder', '', props.userId);
	};
	const changePosition = (e) => {
		e.target.innerHTML === 'Position UP' ?
			props.changePositionTHUNK(props.element.id, "up", props.userId) :
			props.changePositionTHUNK(props.element.id, "down", props.userId)
	};
	const deleteBlock = () => {
		if (window.confirm('Вы хотите удалить блок?')){
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

	const activeElement = (e) => {
		props.changeActiveElement(props.element.id);
	};

	return (
		<div className={`Block ${!props.element.isBorder} ${props.activeElement === props.element.id && 'active'}`}
				 onContextMenu={showBlockContextMenu}
				 onClick={activeElement} >
			{title !== '' && !isChangeTitle &&
			<div className='blockTitle' onDoubleClick={(e) => setIsChangeTitle(true)}>
				{title}</div>
			}
			{isChangeTitle &&
			<div className='blockTitle'>
				<form action="#">
					<textarea className='inputTitle' autoFocus
										value={title}
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setTitle(e.target.value);
											textareaResize(e);
										}}/>
					<button className='saveNameBtn' onClick={changeTitleInBlock}>SAVE</button>
				</form>
			</div>
			}
			{subTitle !== '' && !isChangeSubTitle &&
			<div className='blockSubTitle' onDoubleClick={(e) => setIsChangeSubTitle(true)}>
				{subTitle}</div>
			}
			{isChangeSubTitle &&
			<div className='blockTitle'>
				<form action="#">
					<textarea className='inputSubTitle' autoFocus
										value={subTitle}
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setSubTitle(e.target.value);
											textareaResize(e);
										}}/>
					<button className='saveNameBtn' onClick={changeSubTitleInBlock}>SAVE</button>
				</form>
			</div>
			}

			{text !== '' && !isChangeText &&
			<div className='blockText' onDoubleClick={(e) => setIsChangeText(true)}>
				{text}</div>
			}
			{isChangeText &&
			<div className=''>
				<form action="#">
					<textarea value={text} autoFocus
										onKeyUp={textareaResize}
										onFocus={textareaResize}
										onChange={(e) => {
											setText(e.target.value);
											textareaResize(e);
										}}/>
					<button className='saveNameBtn' onClick={changeTextInBlock}>SAVE</button>
				</form>
			</div>
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
					setTitle(title === '' ? 'new Title' : title);
					setIsChangeTitle(true);
				}}>Change Title</span>
				<span onPointerDown={() => {
					setSubTitle(subTitle === '' ? 'new Sub-Title' : subTitle);
					setIsChangeSubTitle(true);
				}}>Change Sub-Title</span>
				<span onPointerDown={() => {
					setText(text === '' ? 'new Text' : text);
					setIsChangeText(true);
				}}>Change Text</span>
				<hr/>
				<span onPointerDown={changeBorderInBlock}>{props.element.isBorder ? `Clear Border` : `Show Border`}</span>
				<hr/>
				<span onPointerDown={changePosition}>Position UP</span>
				<span onPointerDown={changePosition}>Position DOWN</span>
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
	})
(BlockComponent);