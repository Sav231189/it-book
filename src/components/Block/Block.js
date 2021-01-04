import React,{useState} from 'react';
import './Block.css';
import {getFileMain} from "../../selectors/MainSelector";
import {connect} from "react-redux";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";
import {
	addBlockInBlock,
	changeIsOpenContextMenu, changePositionBlock, changeSubTitleInBlock, changeTextInBlock,
	changeTitleInBlock,
	closeAllIsOpenContextMenu, deleteBlock
} from "../../redux/reducers/SectionReducer";


export function BlockComponent(props) {

	let [title, setTitle] = useState(props.element.title);
	let [subTitle, setSubTitle] = useState(props.element.subTitle);
	let [text, setText] = useState(props.element.text);

	let [isChangeTitle, setIsChangeTitle] = useState(false);
	let [isChangeSubTitle, setIsChangeSubTitle] = useState(false);
	let [isChangeText, setIsChangeText] = useState(false);

	const showContextMenuBlock = (e) => {
		if (!props.isOpenMenu && !props.element.isOpenContextMenu) {
			e.currentTarget.lastChild.style
				= `top: ${e.clientY - 70}px; left: ${props.panelShow ? e.clientX - 460 : e.clientX}px; display: block;`;
			props.closeAllIsOpenContextMenu();
			props.changeIsOpenMenu(true);
			props.changeIsOpenContextMenu(props.element.id);
		} else {
			props.closeOpenMenu();
			props.closeAllIsOpenContextMenu();
			props.changeIsOpenMenu(false);
		}
		e.stopPropagation();
		e.preventDefault();
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
			<div className="contextMenuBlock" style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				<span onClick={addBlockInBlock}> + Add Block </span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={()=>{setTitle(title === '' ? 'new Title' : title);setIsChangeTitle(true);}}> Change Title </span>
				<span onClick={()=>{setSubTitle(subTitle ==='' ? 'new Sub-Title' : subTitle);setIsChangeSubTitle(true);}}> Change Sub-Title </span>
				<span onClick={()=>{setText(text === '' ? 'new text' : text);setIsChangeText(true);}}> Change Text </span>
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
		isOpenMenu: state.app.isOpenMenu,
		panelShow: state.panel.show,
	}
};
export const Block = connect(mstp, {
	changeIsOpenMenu,
	closeAllIsOpenContextMenu,
	changeIsOpenContextMenu,
	closeOpenMenu,
	addBlockInBlock,
	changeTitleInBlock,
	changeSubTitleInBlock,
	changeTextInBlock,
	deleteBlock,
	changePositionBlock,

})
(BlockComponent);