import React, {useRef, useState} from 'react';
import './Block.css';
import {connect} from "react-redux";
import {
	addBlockInActiveFile,
	changeIsOpenContextMenu,
	changePositionBlock, changeSubTitleInBlock, changeTextInBlock,
	changeTitleInBlock,
	closeAllIsOpenContextMenu, deleteBlock
} from "../../redux/reducers/SectionReducer";
import {changeIsContextMenu, closeAllContextMenu} from "../../redux/reducers/AppReducer";

export function BlockComponent(props) {
	const refContextMenu = useRef(null);

	let [title, setTitle] = useState(props.element.title);
	let [subTitle, setSubTitle] = useState(props.element.subTitle);
	let [text, setText] = useState(props.element.text);

	let [isChangeTitle, setIsChangeTitle] = useState(false);
	let [isChangeSubTitle, setIsChangeSubTitle] = useState(false);
	let [isChangeText, setIsChangeText] = useState(false);

	const showNavItemContextMenu = (e) => {
		props.closeAllIsOpenContextMenu();
		props.closeAllContextMenu();
		if (!props.isContextMenu && !props.element.isOpenContextMenu && props.activeFileName !== '') {
			if (e.clientY < window.innerHeight - 200) {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenu(true);
					props.changeIsOpenContextMenu(props.element.id, true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 158}px;`;
					props.changeIsContextMenu(true);
					props.changeIsOpenContextMenu(props.element.id, true);
				}
			} else {
				if (e.clientX < window.innerWidth - 160) {
					refContextMenu.current.style = `top: ${e.clientY - 190}px; left: ${e.clientX + 2}px;`;
					props.changeIsContextMenu(true);
					props.changeIsOpenContextMenu(props.element.id, true);
				} else {
					refContextMenu.current.style = `top: ${e.clientY - 190}px; left: ${e.clientX - 158}px;`;
					props.changeIsContextMenu(true);
					props.changeIsOpenContextMenu(props.element.id, true);
				}
			}
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const addBlockInActiveFile = () => {
		props.closeAllIsOpenContextMenu();
		props.addBlockInActiveFile(props.element, props.userId);
	};
	const changeTitleInBlock = () => {
		setIsChangeTitle(false);
		props.changeTitleInBlock(props.element, title, props.userId);
	};
	const changeSubTitleInBlock = () => {
		setIsChangeSubTitle(false)
		props.changeSubTitleInBlock(props.element, subTitle, props.userId);
	};
	const changeTextInBlock = () => {
		setIsChangeText(false)
		props.changeTextInBlock(props.element, text, props.userId);
	};
	const deleteBlock = () => {
		props.deleteBlock(props.element.id, props.userId);
	};
	const changePositionBlock = (side) => {
		props.changePositionBlock(props.element.id, side);
	};

	return (
		<div className='Block'
				 onPointerOver={(e) => {
					 e.currentTarget.classList.add("active");
					 e.stopPropagation();
					 e.preventDefault();
				 }}
				 onPointerOut={(e) => {
					 e.currentTarget.classList.remove("active")
				 }}
				 onContextMenu={showNavItemContextMenu}>

			{title !== '' && !isChangeTitle &&
			<div className='blockTitle'>{title} </div>
			}
			{isChangeTitle &&
			<div className='blockTitle'>
				<input className='inputTitle' autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
				<span className='saveNameBtn' onClick={changeTitleInBlock}>SAVE</span>
			</div>
			}

			{subTitle !== '' && !isChangeSubTitle &&
			<div className='blockSubTitle'>{subTitle}</div>
			}
			{isChangeSubTitle &&
			<div className='blockTitle'>
				<input className='inputSubTitle' autoFocus value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
				<span className='saveNameBtn' onClick={changeSubTitleInBlock}>SAVE</span>
			</div>
			}

			{text !== '' && !isChangeText &&
			<div className='blockText'>{text}</div>
			}
			{isChangeText &&
			<div className=''>
				<textarea value={text} onChange={(e) => setText(e.target.value)}/>
				<span className='saveNameBtn' onClick={changeTextInBlock}>SAVE</span>
			</div>
			}

			{props.element.fileMain &&
			props.element.fileMain.map(el =>
				<Block key={el.id} element={el}/>)
			}

			{/* contextMenu */}

			<div ref={refContextMenu} className="contextMenuBlock"
					 style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				<span onClick={addBlockInActiveFile}> + Add Block </span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={() => {
					setTitle(title === '' ? 'new Title' : title);
					setIsChangeTitle(true);
				}}> Change Title </span>
				<span onClick={() => {
					setSubTitle(subTitle === '' ? 'new Sub-Title' : subTitle);
					setIsChangeSubTitle(true);
				}}> Change Sub-Title </span>
				<span onClick={() => {
					setText(text === '' ? 'new text' : text);
					setIsChangeText(true);
				}}> Change Text </span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={() => changePositionBlock('up')}> position UP </span>
				<span onClick={() => changePositionBlock('down')}> position DOWN </span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={deleteBlock}> - Delete Block </span>
			</div>

		</div>
	);
}

const mstp = (state) => {
	return {
		isOpenContextMenu: state.app.isOpenContextMenu,
		userId: state.app.userId,
	}
};
export const Block = connect(mstp, {
	changeIsContextMenu,
	changeIsOpenContextMenu,
	closeAllIsOpenContextMenu,
	closeAllContextMenu,

	addBlockInActiveFile,
	changeTitleInBlock,
	changeSubTitleInBlock,
	changeTextInBlock,
	deleteBlock,
	changePositionBlock,

})
(BlockComponent);