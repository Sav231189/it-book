import React from 'react';
import './SectionItem.css'
import logoSection from '../../img/logo.png';
import {changePositionBlock} from "../../redux/reducers/SectionReducer";

export function SectionItem(props) {
	// console.log('render SectionItem')
	const name = React.createRef();
	const url = React.createRef();

	const showMenuSectionItem = (e) => {
		if(!props.isMenuSectionItem && !props.isOpenMenu){
			e.target.parentElement.lastChild.style = `top: ${e.clientY - 60}px; left: ${e.clientX}px;`;
			props.menuSectionItemShow(props.position);
			props.changeIsOpenMenu(true);
		}
	};

	const deleteSectionItem = () => {
		if(confirm( "вы уверены что хотите удалить раздел?")){
			props.deleteSectionItem(props.position);
		}
	};
	const showChangeSectionItem = () => {
			props.showChangeSectionItem(props.position);
	};
	const unShowChangeSectionItem = () => {
			props.unShowChangeSectionItem();
	};
	const activateSectionItem = () => {
		props.activateSectionItem(props.id);
	};
	const saveChange = () => {
		unShowChangeSectionItem();
		props.changeSectionItem(props.id, name.current.value, url.current.value);
		name.current.value = '';
		url.current.value = '';
	};
	const changePositionSectionItem = (side) => {
		props.changePositionSectionItem(props.id, side);
	};


	return (
		<div className="item" onContextMenu={showMenuSectionItem} onClick={activateSectionItem}>
			{props.isActive && <div className='isActiveSectionItem'> </div>}
			{	props.url !== '' ?
				<img src = {props.url} alt = {props.name} />
				: <img src = {logoSection} alt = {logoSection.name} />
			}
			<div className="nameBlock">
				<span> {props.name} </span>
			</div>
			<div className="sectionItemChange"
					 onContextMenu={(e)=>{e.stopPropagation();e.preventDefault()}}
					 style={props.isChangeSectionItem ? {top: "-60px"} : {top: "-460px"}} >
				<div className="sectionItemChangeBox"
						 onContextMenu={(e)=>{e.stopPropagation();e.preventDefault()}} >
					<div className="sectionItemChangeTitle">Изменение секции:</div>
					<label htmlFor="">
						<span>Name:</span>
						<input ref={name} type="text" placeholder={props.name}/>
					</label>
					<label htmlFor="">
						<span>Url:</span>
						<input ref={url} type="text" placeholder={props.url}/>
					</label>
					<div className="sectionItemChangeBtn" onClick={saveChange}>
						Save
					</div>
				</div>
				<div className="sectionItemChangeClose" onClick={unShowChangeSectionItem}>
					<div> </div>
					<div> </div>
				</div>
			</div>
			<div className="menuSectionItem" style={props.isMenuSectionItem ? {display: 'block'} : {display: 'none'}} >
				<span onClick={showChangeSectionItem}>Изменить</span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={()=>changePositionSectionItem('up')}>position UP</span>
				<span onClick={()=>changePositionSectionItem('down')}>position DOWN</span>
				<hr style={{background: 'grey', height: "1px"}}/>
				<span onClick={deleteSectionItem}>Удалить</span>
			</div>
		</div>
	);
}
