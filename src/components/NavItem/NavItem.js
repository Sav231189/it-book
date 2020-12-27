import React from 'react';
import './NavItem.css';
import {NavItems} from "../NavItems/NavItems";

export function NavItem(props) {
	let step = [];
	for (let i = 0; i < props.step; i++) {
		step.push(<span key={i}>----</span>);
	}
	return (
		<div>
			<div onClick={(e)=>console.log(props.element.id)}>{step}{props.element.name}</div>
			{ props.element.type === 'folder'
				? <NavItems navItems={props.element.folderItems} step={props.step+1}/>
				: null
			}
		</div>
	);
}
