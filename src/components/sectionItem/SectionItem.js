import React, {useState,useRef} from 'react';
import './SectionItem.css'
import logoSection from '../../img/logo.png';
import {connect} from "react-redux";
import {
	changeIsContextMenu,
} from "../../redux/reducers/AppReducer";
import {
	activateSectionItem,
	changeIsOpenContextMenu,
	changePositionSectionItem, changeSectionItem, deleteSectionItem
} from "../../redux/reducers/SectionReducer";

export function SectionItemComponent(props) {

	const refContextMenu = useRef(null);

	const [isChangeName, setIsChangeName] = useState(false);
	const [isChangeImg, setIsChangeImg] = useState(false);

	const [newName, setNewName] = useState('');
	const [newImgURL, setNewImgURL] = useState('');

	const showSectionItemContextMenu = (e) => {
		if (!props.isContextMenu && !props.element.isOpenContextMenu && props.element.isActive) {
			refContextMenu.current.style= `top: ${e.clientY - 60}px; left: ${e.clientX}px;`;
			props.changeIsContextMenu(true);
			props.changeIsOpenContextMenu(props.element.id,true);
			// e.preventDefault();
			// e.stopPropagation();
		}
	};
	const activateSectionItem = () => {
		props.activateSectionItem(props.element.id);
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
	const changePositionSectionItem = (side) => {
		props.changePositionSectionItem(props.element.id, side,props.userId);
		props.changeIsContextMenu(false);
	};
	const deleteSectionItem = () => {
		if (confirm("вы уверены что хотите удалить раздел?")) {
			props.deleteSectionItem(props.element.id,props.userId);
			props.changeIsContextMenu(false);
		}
	};
	const saveChange = () => {
		isChangeName
			?	props.changeSectionItem(newName,'',props.element.id,props.userId)
			: props.changeSectionItem('',newImgURL,props.element.id,props.userId);
		setNewName('');
		setNewImgURL('');
		setIsChangeName(false);
		setIsChangeImg(false);
	};


	return (
		<div className={`item ${props.element.isActive}`}
				 onContextMenu={showSectionItemContextMenu}
				 onClick={activateSectionItem}>
			{props.element.isActive && <div className='isActiveSectionItem'> </div>}
			{props.element.url !== ''
				?
				<img src={props.url} alt={props.name}/>
				:
				<img src={logoSection} alt={logoSection.name}/>
			}

			<div className="nameBlock">
				<span> {props.element.name} </span>
			</div>

			<div ref={refContextMenu} className="menuSectionItem"
					 style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				{!isChangeName
					? <div><span className="menuItem" onClick={changeName}> Change Name </span>

					</div>
					: <div><input type="text" onClick={changeName} placeholder='new Name'
												onChange={(e) => setNewName(e.currentTarget.value)}
												value={newName}/>
						<span className="menuItem save_btn" onClick={saveChange}>Save</span>
					</div>
				}
				{!isChangeImg
					? <div><span className="menuItem" onClick={changeImg}> Change Img </span>
						<hr style={{background: 'grey', height: "1px"}}/>
					</div>
					: <div><input type="text" onClick={changeImg} placeholder='new URL'
												onChange={(e) => setNewImgURL(e.currentTarget.value)}
												value={newImgURL}/>
						<span className="menuItem save_btn" onClick={saveChange}>Save</span>
					</div>
				}
				<span onClick={() => changePositionSectionItem('up')}>position UP</span>
				<span onClick={() => changePositionSectionItem('down')}>position DOWN</span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={deleteSectionItem}>Удалить</span>
			</div>
		</div>
	);
}

const mstp = (state) => {
	return {
		isContextMenu: state.app.isContextMenu,
		userId: state.app.userId,
	}
};
export const SectionItem = connect(
	mstp,
	{
		changeIsContextMenu,
		changeIsOpenContextMenu,
		activateSectionItem,
		changePositionSectionItem,
		deleteSectionItem,
		changeSectionItem,
	}
)(SectionItemComponent);

