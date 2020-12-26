import React from 'react';
import './SectionItem.css'

export function SectionItem(props) {
	// console.log('render SectionItem')

	const showMenuSectionItem = (e) => {
		if(!props.isMenuSectionItem && !props.isOpenMenu){
			e.target.lastChild.style = `top: ${e.clientY - 60}px; left: ${e.clientX}px;`;
			props.menuSectionItemShow(props.position);
			props.changeIsOpenMenu(true);
		}
	};

	return (
		<div className="item" onContextMenu={showMenuSectionItem}>
			{props.url!=="" && <img src = {props.url} alt = {props.name}/>}
			<div className="menuSectionItem" style={props.isMenuSectionItem ? {display: 'block'} : {display: 'none'}} >
				<span>Изменить</span>
				<span>Удалить</span>
			</div>
		</div>
	);
}
