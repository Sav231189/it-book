import React from 'react';
import './NavItems.css'
import {NavItem} from "../NavItem/NavItem";

export function NavItems(props) {
	// console.log("render NavItem")
	return (
		<div className='navItems'>
			{props.navItems.map((el)=><NavItem key={el.id} element={el} step={props.step}/>)}
		</div>
	);
}
