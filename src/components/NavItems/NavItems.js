import React from 'react';
import './NavItems.css'
import {NavItem} from "../NavItem/NavItem";

export function NavItems(props) {



	return (
		<div className='navItems'>
			{props.navItems.map((el,index) => {
				return <NavItem key={index} element={el} step={props.step}/>
				})
			}
		</div>
	);
}
