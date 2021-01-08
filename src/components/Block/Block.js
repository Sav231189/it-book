import React, {useRef, useState} from 'react';
import './Block.css';
import {connect} from "react-redux";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";
import {
	addBlockInBlock,
	changeIsOpenContextMenu, changePositionBlock, changeSubTitleInBlock, changeTextInBlock,
	changeTitleInBlock,
	closeAllIsOpenContextMenu, deleteBlock
} from "../../redux/reducers/SectionReducer";


export function BlockComponent(props) {
	const refContextMenu = useRef(null);

	let [title, setTitle] = useState(props.element.title);
	let [subTitle, setSubTitle] = useState(props.element.subTitle);
	let [text, setText] = useState(props.element.text);

	let [isChangeTitle, setIsChangeTitle] = useState(false);
	let [isChangeSubTitle, setIsChangeSubTitle] = useState(false);
	let [isChangeText, setIsChangeText] = useState(false);


	const showNavItemContextMenu = (e) => {
		if (!props.isContextMenu && !props.element.isOpenContextMenu) {
			refContextMenu.current.style = `top: ${e.clientY - 55}px; left: ${e.clientX }px;`;
			props.changeIsContextMenu(true);
			props.changeIsOpenContextMenu(props.element.id, true);
			// e.stopPropagation();
			// e.preventDefault();
		}
	};

	const addBlockInBlock = () => {
		props.addBlockInBlock(props.element.id);
	};
	const changeTitleInBlock = () => {
		setIsChangeTitle(false);
		props.changeTitleInBlock(props.element.id, title);
	};
	const changeSubTitleInBlock = () => {
		setIsChangeSubTitle(false)
		props.changeSubTitleInBlock(props.element.id, subTitle);
	};
	const changeTextInBlock = () => {
		setIsChangeText(false)
		props.changeTextInBlock(props.element.id, text);
	};
	const deleteBlock = () => {
		props.deleteBlock(props.element.id);
	};
	const changePositionBlock = (side) => {
		props.changePositionBlock(props.element.id, side);
	};


	return (
		<div className='Block' onContextMenu={showContextMenuBlock}>

			{title !== '' && !isChangeTitle &&
			<div className='blockTitle'>{title} </div>
			}
			{isChangeTitle &&
				<div className='blockTitle'>
					<input className='inputTitle' autoFocus value={title} onChange={(e)=>setTitle(e.target.value)}/>
					<span className='saveNameBtn' onClick={changeTitleInBlock}>SAVE</span>
				</div>
			}

			{subTitle !== '' && !isChangeSubTitle &&
			<div className='blockSubTitle'>{subTitle}</div>
			}
			{isChangeSubTitle &&
			<div className='blockTitle'>
				<input className='inputSubTitle' autoFocus value={subTitle} onChange={(e)=>setSubTitle(e.target.value)}/>
				<span className='saveNameBtn' onClick={changeSubTitleInBlock}>SAVE</span>
			</div>
			}

			{text !== '' && !isChangeText &&
			<div className='blockText'>{text}</div>
			}
			{isChangeText &&
			<div className='blockTitle'>
				<textarea  value={text} onChange={(e)=>setText(e.target.value)}/>
				<span className='saveNameBtn' onClick={changeTextInBlock}>SAVE</span>
			</div>
			}

			{props.element.inner &&
			props.element.inner.map(el =>
				<Block key={el.id} element={el}/>)
			}

			{/* contextMenu */}
			<div ref={refContextMenu} className="contextMenuBlock"
					 style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				{!isRenameMode
					? <div><span className="menuItem" onClick={changeName}> Change Name </span></div>
					: <div><input type="text" onClick={changeName} placeholder='new Name'
												onChange={(e) => setName(e.currentTarget.value)}
												value={name}/>
						<span className="menuItem save_btn" onClick={saveChange}>Save</span>
					</div>
				}
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={() => {}}>position UP</span>
				<span onClick={() => {}}>position DOWN</span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={() => {props.deleteNavItem(props.element.id,props.userId)}}>Удалить</span>
			</div>


			{/*<div className="showNavItemContextMenu" style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>*/}
			{/*	<span onClick={addBlockInBlock}> + Add Block </span>*/}
			{/*	<hr style={{background: 'grey', height: "1px"}}/>*/}
			{/*	<span onClick={()=>{setTitle(title === '' ? 'new Title' : title);setIsChangeTitle(true);}}> Change Title </span>*/}
			{/*	<span onClick={()=>{setSubTitle(subTitle ==='' ? 'new Sub-Title' : subTitle);setIsChangeSubTitle(true);}}> Change Sub-Title </span>*/}
			{/*	<span onClick={()=>{setText(text === '' ? 'new text' : text);setIsChangeText(true);}}> Change Text </span>*/}
			{/*	<hr style={{background: 'grey', height: "1px"}}/>*/}
			{/*	<span onClick={() => changePositionBlock('up')}> position UP </span>*/}
			{/*	<span onClick={() => changePositionBlock('down')}> position DOWN </span>*/}
			{/*	<hr style={{background: 'grey', height: "1px"}}/>*/}
			{/*	<span onClick={deleteBlock}> - Delete Block </span>*/}
			{/*</div>*/}

		</div>
	);
}
const mstp = (state) => {
	return {
		isOpenContextMenu: state.app.isOpenContextMenu,
	}
};
export const Block = connect(mstp, {
	closeAllIsOpenContextMenu,
	changeIsOpenContextMenu,
	addBlockInBlock,
	changeTitleInBlock,
	changeSubTitleInBlock,
	changeTextInBlock,
	deleteBlock,
	changePositionBlock,

})
(BlockComponent);