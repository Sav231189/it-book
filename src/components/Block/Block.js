import React, {useRef, useState} from 'react';
import './Block.css';
import {connect} from "react-redux";
import {
	addBlockInActiveFileTHUNK, changeBlockTHUNK,
	changeIsOpenContextMenuItemAC, changePositionTHUNK,
	deleteElementTHUNK
} from "../../redux/reducers/SectionReducer";
import {changeIsContextMenuAC} from "../../redux/reducers/AppReducer";
import {getActiveFile} from "../../selectors/SectionSelector";
import {getIsContextMenu, getUserId} from "../../selectors/AppSelector";

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
		props.deleteElementTHUNK(props.element.id, 'element', props.userId);
	};

	return (
		<div className={`Block ${!props.element.isBorder}`} onContextMenu={showBlockContextMenu}>
			{title !== '' && !isChangeTitle &&
			<div className='blockTitle'>{title} </div>
			}
			{isChangeTitle &&
			<div className='blockTitle'>
				<form action="#">
					<input className='inputTitle' autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
					<button className='saveNameBtn' onClick={changeTitleInBlock}>SAVE</button>
				</form>
			</div>
			}
			{subTitle !== '' && !isChangeSubTitle &&
			<div className='blockSubTitle'>{subTitle}</div>
			}
			{isChangeSubTitle &&
			<div className='blockTitle'>
				<form action="#">
					<input className='inputSubTitle' autoFocus value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
					<button className='saveNameBtn' onClick={changeSubTitleInBlock}>SAVE</button>
				</form>
			</div>
			}

			{text !== '' && !isChangeText &&
			<div className='blockText'>{text}</div>
			}
			{isChangeText &&
			<div className=''>
				<form action="#">
					<textarea value={text} onChange={(e) => setText(e.target.value)}/>
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
				<span onClick={addBlockInActiveFile}>New Block</span>
				<hr/>
				<span onClick={() => {
					setTitle(title === '' ? 'new Title' : title);
					setIsChangeTitle(true);
				}}>Change Title</span>
				<span onClick={() => {
					setSubTitle(subTitle === '' ? 'new Sub-Title' : subTitle);
					setIsChangeSubTitle(true);
				}}>Change Sub-Title</span>
				<span onClick={() => {
					setText(text === '' ? 'new Text' : text);
					setIsChangeText(true);
				}}>Change Text</span>
				<hr/>
				<span onClick={changeBorderInBlock}>{props.element.isBorder ? `Clear Border` : `Show Border`}</span>
				<hr/>
				<span onClick={changePosition}>Position UP</span>
				<span onClick={changePosition}>Position DOWN</span>
				<hr/>
				<span onClick={deleteBlock}>Delete Block</span>
			</div>

		</div>
	);
}

export const Block = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		userId: getUserId(state),
		activeFile: getActiveFile(state),
	}), {
		changeIsContextMenuAC,
		changeIsOpenContextMenuItemAC,
		addBlockInActiveFileTHUNK,
		changeBlockTHUNK,
		changePositionTHUNK,
		deleteElementTHUNK,
	})
(BlockComponent);