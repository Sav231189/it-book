import React, {useState, useRef} from 'react';
import './SectionItem.css'
import logoSection from '../../img/logo.png';
import {connect} from "react-redux";
import {
	activateSectionItemTHUNK, changeIsOpenContextMenuItemAC,
	changePositionTHUNK, changeSectionItem, deleteElementTHUNK
} from "../../redux/reducers/SectionReducer";
import loadingSectionItem from '../../img/giphy.gif'
import {changeIsContextMenuAC} from "../../redux/reducers/AppReducer";
import {getIsContextMenu, getUserId} from "../../selectors/AppSelector";

export function SectionItemComponent(props) {
// debugger
	const refContextMenu = useRef(null);

	const [isChangeName, setIsChangeName] = useState(false);
	const [isChangeImg, setIsChangeImg] = useState(false);

	const [newName, setNewName] = useState('');
	const [newImgURL, setNewImgURL] = useState('');

	const showSectionItemContextMenu = (e) => {

		if (!props.isContextMenu && !props.element.isOpenContextMenu) {
			setIsChangeName(false);
			setNewName('');
			setIsChangeImg(false);
			setNewImgURL('');
			e.preventDefault();
			e.stopPropagation();
			props.changeIsContextMenuAC('isContextMenu', true);
			props.changeIsOpenContextMenuItemAC(props.element.id, true);
			props.activateSectionItemTHUNK(props.element.id, props.userId);
			(e.clientY < window.innerHeight - 210)
				? refContextMenu.current.style = `top: ${e.clientY + 10}px; left: ${e.clientX + 10}px;`
				: refContextMenu.current.style = `top: ${e.clientY - 160}px; left: ${e.clientX}px;`
		}
	};
	const activateSectionItem = () => {
		props.activateSectionItemTHUNK(props.element.id, props.userId);
	};
	const changeName = (e) => {
		setIsChangeName(true);
		setIsChangeImg(false);
		e.preventDefault();
		e.stopPropagation();
	};
	const changeImg = (e) => {
		setIsChangeName(false);
		setIsChangeImg(true);
		e.preventDefault();
		e.stopPropagation();
	};

	const changePosition = (e) => {
		e.target.innerHTML === 'Position UP' ?
			props.changePositionTHUNK(props.element.id, 'up', props.userId) :
			props.changePositionTHUNK(props.element.id, 'down', props.userId)
	};
	const deleteSectionItem = () => {
		if (confirm("вы уверены что хотите удалить раздел?")) {
			props.deleteElementTHUNK(props.element.id, 'sectionItem', props.userId);
		}
	};
	const saveChange = () => {
		isChangeName
			? props.changeSectionItem(newName, '', props.element.id, props.userId)
			: props.changeSectionItem('', newImgURL, props.element.id, props.userId);
		setNewName('');
		setNewImgURL('');
		setIsChangeName(false);
		setIsChangeImg(false);
	};

	return (
		<div className={`item ${props.element.isActive} ${props.element.url !== '' ? "url" : ''}`}
				 onContextMenu={showSectionItemContextMenu}
				 onClick={activateSectionItem}>
			{props.element.isActive && <div className='isActiveSectionItem'> </div>}
			{props.element.isLoading
				?
				<div>{props.element.url !== '' ? <img src={props.element.url} alt={props.element.url}/>
					: <img src={logoSection} alt='logoSection'/>}
				</div>
				:
				<div>
					<img src={loadingSectionItem} alt="loadingSectionItem"/>
				</div>
			}
			<div className="nameBlock">{props.element.name}</div>

			<div ref={refContextMenu} className="contextMenu"
					 style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				{!isChangeName ? <div><span className="menuItem" onClick={changeName}> Change Name </span></div>
					: <div>
						<form action="#"><input type="text" maxLength={24} onClick={changeName} placeholder='new Name'
																		onChange={(e) => setNewName(e.currentTarget.value)} value={newName}/>
							<button className="menuItem save_btn" onClick={saveChange}>Save</button>
						</form>
						<hr/>
					</div>
				}
				{!isChangeImg
					? <div><span className="menuItem" onClick={changeImg}> Change Img </span>
						<hr/>
					</div>
					: <div>
						<hr/>
						<form action="#"><input type="text" onClick={changeImg} placeholder='new URL'
																		onChange={(e) => setNewImgURL(e.currentTarget.value)} value={newImgURL}/>
							<button className="menuItem save_btn" onClick={saveChange}>Save</button>
						</form>
						<hr/>
					</div>
				}
				<span onClick={changePosition}>Position UP</span>
				<span onClick={changePosition}>Position DOWN</span>
				<hr/>
				<span onClick={deleteSectionItem}>Удалить</span>
			</div>
		</div>
	);
}

export const SectionItem = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		userId: getUserId(state),
	}), {
		changeIsContextMenuAC,
		changeIsOpenContextMenuItemAC,
		activateSectionItemTHUNK,
		changePositionTHUNK,
		deleteElementTHUNK,
		changeSectionItem,
	}
)(SectionItemComponent);

