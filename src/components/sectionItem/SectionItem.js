import React from 'react';
import './SectionItem.css'
import {changeSectionItem} from "../../redux/reducers/SectionReducer";

export function SectionItem(props) {
	console.log('render SectionItem')

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

	return (
		<div className="item" onContextMenu={showMenuSectionItem}>
			<img src = {props.url} alt = {props.name} />
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
						<input type="text" placeholder={props.name}/>
					</label>
					<label htmlFor="">
						<span>Url:</span>
						<input type="text" placeholder={props.url}/>
					</label>
					<label htmlFor="" className="sectionItemChangePosition">
						<span>Position:</span>
						<input type="number" placeholder={props.position+1} min={1} max={props.length}/>
					</label>
					<div className="sectionItemChangeBtn">
						Save
					</div>
				</div>
				<div className="sectionItemChangeClose" onClick={unShowChangeSectionItem}>
					<div></div>
					<div></div>
				</div>
			</div>
			<div className="menuSectionItem" style={props.isMenuSectionItem ? {display: 'block'} : {display: 'none'}} >
				<span onClick={showChangeSectionItem}>Изменить</span>
				<span onClick={deleteSectionItem}>Удалить</span>
			</div>
		</div>
	);
}
